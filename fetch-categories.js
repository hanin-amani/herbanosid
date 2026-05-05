const fs = require('fs');
async function fetchCategories() {
  const response = await fetch('https://herbanos.id/wp-json/wp/v2/categories?per_page=100');
  const categories = await response.json();
  fs.writeFileSync('wp_categories.json', JSON.stringify(categories, null, 2));
  console.log(`✅ Berhasil mengambil ${categories.length} kategori.`);
}
fetchCategories();