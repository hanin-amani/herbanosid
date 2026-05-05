const fs = require('fs');

// Baca file yang baru kita buat
const authorsData = JSON.parse(fs.readFileSync('wp_authors.json', 'utf8'));

const sanityAuthors = authorsData.map(user => ({
  _type: 'author',
  _id: `wp-author-${user.id}`, // Ini kunci agar 'Document unavailable' hilang
  name: user.name,
  slug: {
    _type: 'slug',
    current: user.slug,
  },
  bio: user.description || '',
  socialLinks: []
}));

const ndjson = sanityAuthors.map(doc => JSON.stringify(doc)).join('\n');
fs.writeFileSync('authors_to_sanity.ndjson', ndjson);
console.log('✅ File authors_to_sanity.ndjson siap di-import!');