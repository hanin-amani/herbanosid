const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// MEMAKSA NODE MEMBACA .env.local
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2026-05-05'
});

async function upload() {
  const input = path.join(__dirname, 'ready_to_upload.json');
  if (!fs.existsSync(input)) return console.error("File upload tidak ada!");

  const articles = JSON.parse(fs.readFileSync(input, 'utf-8'));
  console.log(`--- 🚀 Mengunggah ${articles.length} Draft ke Sanity ---`);

  for (const a of articles) {
    try {
      await client.create({
        _type: 'post',
        title: a.title,
        slug: { _type: 'slug', current: `new-${Math.random().toString(36).substring(7)}` },
        body: [{ _key: '1', _type: 'block', children: [{ _type: 'span', text: a.content.replace(/<[^>]*>/g, '') }] }]
      });
      console.log(`✅ Terupload: ${a.title}`);
    } catch (e) {
      console.error(`❌ Gagal: ${a.title} | ${e.message}`);
    }
  }
}

upload();