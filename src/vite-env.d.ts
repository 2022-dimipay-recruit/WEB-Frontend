/// <reference types="vite/client" />
interface InportMetaEnv {
  readonly VITE_API_URI: string;
};

interface ImportMeta {
  readonly env: ImportMetaEnv;
};