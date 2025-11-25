import { ValidateEnv } from '@julr/vite-plugin-validate-env';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig, loadEnv } from 'vite';
import envConfig from './src/config/env';

export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  // import.meta.env.VITE_PORT available here with: process.env.VITE_PORT
  return defineConfig({
    plugins: [react(), tailwindcss(), ValidateEnv(envConfig)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      port: parseInt(process.env['VITE_PORT'] as string),
    },
  });
};
