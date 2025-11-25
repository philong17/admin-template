/// <reference types="vite/client" />

type ImportMetaEnvAugmented = import('@julr/vite-plugin-validate-env').ImportMetaEnvAugmented<
  typeof import('../config/env').default
>;

interface ImportMetaEnv extends ImportMetaEnvAugmented {}
