import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "expn5kpa", // GANTI dengan Project ID asli Anda dari .env atau manage.sanity.io
    dataset: "production",
  },
});