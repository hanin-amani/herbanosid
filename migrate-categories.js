const fs = require('fs');

// 1. Load data kategori
if (!fs.existsSync('wp_categories.json')) {
  console.error("❌ File wp_categories.json tidak ditemukan!");
  process.exit(1);
}

const categoriesData = JSON.parse(fs.readFileSync('wp_categories.json', 'utf8'));

// 2. Mapping data ke format Sanity
const sanityCategories = categoriesData.map(cat => ({
  _type: 'category',
  _id: `wp-cat-${cat.id}`, 
  title: cat.name,
  slug: {
    _type: 'slug',
    current: cat.slug || `cat-${cat.id}`,
  },
  description: cat.description || '',
  color: cat.id === 33 ? '#15803d' : '#64748b' // Hijau untuk Artikel, Abu-abu untuk lainnya
}));

// 3. Simpan ke NDJSON
const ndjson = sanityCategories.map(doc => JSON.stringify(doc)).join('\n');
fs.writeFileSync('categories_to_sanity.ndjson', ndjson);

console.log(`✅ Berhasil mengonversi ${sanityCategories.length} kategori!`);