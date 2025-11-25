// env.ts
import { defineConfig, Schema } from '@julr/vite-plugin-validate-env';

export default defineConfig({
  // Read more: https://github.com/Julien-R44/vite-plugin-validate-env#built-in-validator
  VITE_PORT: Schema.number(),
  VITE_API_BASE_URL: Schema.string(),
});
