const fs = require("fs");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

require("dotenv").config({ path: path.join(__dirname, "../.env.local") });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function gas() {
  const fileIn = path.join(__dirname, "temp_articles.json");
  const fileOut = path.join(__dirname, "ready_to_upload.json");
  const data = JSON.parse(fs.readFileSync(fileIn, "utf-8"));
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const final = [];

  console.log("--- Memulai Herbanos AI ---");

  for (const item of data) {
    console.log("Proses: " + item.title);
    const p = "Parafrase ke JSON {title, content}: " + item.content;
    try {
      const r = await model.generateContent(p);
      const t = await r.response.text();
      let c = t.replace(/```json/g, "").replace(/
```/g, "").trim();
      const ai = JSON.parse(c);
      final.push({ ...item, title: ai.title, content: ai.content });
      console.log("✅ OK");
    } catch (e) {
      console.log("❌ Gagal: " + e.message);
    }
  }
  fs.writeFileSync(fileOut, JSON.stringify(final, null, 2));
  console.log("--- SELESAI ---");
}
gas();
