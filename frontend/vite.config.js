import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/lottery/", // GitHub Pages 경로에 맞게 base 설정
  build: {
    outDir: "build",
  },
});
