// 타입스크립트에서 svg 선언하기
declare module "*.svg" {
  const content: any;
  export default content;

  interface ImportMeta {
    glob: (
      pattern: string,
      options?: { eager?: boolean }
    ) => Record<string, { default: string }>;
  }
}

