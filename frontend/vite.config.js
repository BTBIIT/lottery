import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: "build", // 빌드 결과물이 생성될 폴더 이름 설정
  },
});
