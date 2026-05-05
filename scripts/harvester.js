// scripts/harvester.js
const axios = require('axios');
const fs = require('fs');

async function harvestArticles() {
  const TARGET_URL = "https://www.deherba.com/wp-json/wp/v2/posts?per_page=10"; // Target utama kesehatan herbal
  
  try {
    console.log("--- Memulai Pemanenan Artikel ---");
    const response = await axios.get(TARGET_URL);
    const articles = response.data.map(post => ({
      id: post.id,
      title: post.title.rendered,
      content: post.content.rendered,
      slug: post.slug,
      date: post.date
    }));

    fs.writeFileSync('./scripts/temp_articles.json', JSON.stringify(articles, null, 2));
    console.log(`Berhasil memanen ${articles.length} artikel ke temp_articles.json`);
  } catch (error) {
    console.error("Gagal memanen artikel:", error.message);
  }
}

harvestArticles();