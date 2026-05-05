const fs = require('fs');
const { htmlToBlocks } = require('@sanity/block-tools');
const { JSDOM } = require('jsdom');
const { Schema } = require('@sanity/schema');

// 1. Kompilasi Skema Sesuai post.ts Terbaru
const compiledSchema = Schema.compile({
  name: 'migrationSchema',
  types: [
    {
      name: 'post',
      type: 'document',
      fields: [
        {
          name: 'content',
          type: 'array',
          of: [
            { type: 'block' },
            { type: 'image' }
          ]
        }
      ]
    }
  ]
});

const blockContentType = compiledSchema
  .get('post')
  .fields.find(field => field.name === 'content').type;

// 2. Load data herbanos.id
if (!fs.existsSync('wp_posts.json')) {
  console.error("❌ File wp_posts.json tidak ditemukan!");
  process.exit(1);
}

const wpData = JSON.parse(fs.readFileSync('wp_posts.json', 'utf8'));

// 3. Fungsi Helper
const convertHtmlToPortableText = (html) => {
  if (!html) return [];
  // Bersihkan tag script
  const cleanHtml = html.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "");
  
  return htmlToBlocks(cleanHtml, blockContentType, {
    parseHtml: (html) => new JSDOM(html).window.document,
  });
};

const cleanExcerpt = (html) => {
  if (!html) return "";
  const text = html.replace(/<[^>]*>?/gm, '');
  // Validasi panjang karakter sesuai standar SEO/Sanity Schema
  return text.length > 160 ? text.substring(0, 157) + "..." : text;
};

// 4. Proses Mapping Presisi
console.log(`⏳ Memproses ${wpData.length} artikel herbanos.id...`);

const sanityDocs = wpData.map(post => {
  const doc = {
    _type: 'post', 
    _id: `wp-${post.id}`,
    title: post.title.rendered,
    slug: {
      _type: 'slug',
      current: post.slug,
    },
    excerpt: cleanExcerpt(post.excerpt.rendered),
    publishedAt: new Date(post.date).toISOString(),
    content: convertHtmlToPortableText(post.content.rendered),
    views: 0, 
  };

  // LOGIKA AUTO-DOWNLOAD GAMBAR THUMBNAIL (Featured Image)
  if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
    const media = post._embedded['wp:featuredmedia'][0];
    
    if (media.source_url) {
      doc.mainImage = {
        _type: 'image',
        _sanityAsset: `image@${media.source_url}`, 
        alt: media.alt_text || post.title.rendered,
      };
    }
  }

  // Mapping Referensi Penulis (MENGGUNAKAN WEAK REFERENCE)
  if (post.author) {
    doc.author = {
      _type: 'reference',
      _ref: `wp-author-${post.author}`,
      _weak: true, // Agar tidak error jika ID penulis belum di-import
    };
  }

  // Mapping Referensi Kategori (MENGGUNAKAN WEAK REFERENCE)
  if (post.categories && post.categories.length > 0) {
    doc.categories = post.categories.map(catId => ({
      _type: 'reference',
      _ref: `wp-cat-${catId}`, 
      _key: `cat-${catId}`,
      _weak: true, // KUNCI UTAMA: Agar tidak error jika ID kategori (seperti 45/46) belum ada
    }));
  }

  return doc;
});

// 5. Simpan ke NDJSON
const ndjson = sanityDocs.map(doc => JSON.stringify(doc)).join('\n');
fs.writeFileSync('import_to_sanity.ndjson', ndjson);

console.log('✅ Selesai! File "import_to_sanity.ndjson" siap di-import (Safe Mode Enabled).');