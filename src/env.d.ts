/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly VITE_MAP_API_KEY: string;
  readonly VITE_MAP_ID: string;
}
