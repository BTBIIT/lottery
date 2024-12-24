// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/lottery/", // GitHub Pages에서 이 프로젝트의 경로에 맞게 설정
  build: {
    outDir: "build", // 빌드 결과물이 생성될 폴더 이름 설정
  },
});
