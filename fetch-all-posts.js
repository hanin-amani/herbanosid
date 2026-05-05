const fs = require('fs');

const SITE_URL = 'https://herbanos.id/wp-json/wp/v2/posts';
const PER_PAGE = 100; // Maksimal yang diizinkan WordPress

async function fetchAllPosts() {
  let allPosts = [];
  let page = 1;
  let keepFetching = true;

  console.log('⏳ Memulai pengambilan data dari herbanos.id...');

  while (keepFetching) {
    const url = `${SITE_URL}?per_page=${PER_PAGE}&page=${page}&_embed`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        // Jika halaman sudah habis (error 400), kita berhenti
        keepFetching = false;
        break;
      }

      const posts = await response.json();

      if (posts.length > 0) {
        allPosts = [...allPosts, ...posts];
        console.log(`✅ Halaman ${page} berhasil diambil (${posts.length} artikel)`);
        page++;
      } else {
        keepFetching = false;
      }
    } catch (error) {
      console.error(`❌ Error pada halaman ${page}:`, error.message);
      keepFetching = false;
    }
  }

  // Simpan semua artikel ke dalam satu file
  fs.writeFileSync('wp_posts.json', JSON.stringify(allPosts, null, 2));
  console.log(`\n🎉 SELESAI! Total ${allPosts.length} artikel disimpan di wp_posts.json`);
}

fetchAllPosts();