import { defineConfig } from 'dumi';

export default defineConfig({
  base: '/back-store/',
  publicPath: './',
  title: 'back-store',
  history: { type: 'hash' },
  favicon:
    'https://img.alicdn.com/imgextra/i3/O1CN01dxRZQ61z7XGPRbNeN_!!6000000006667-2-tps-200-200.png',
  logo:
    'https://img.alicdn.com/imgextra/i3/O1CN01dxRZQ61z7XGPRbNeN_!!6000000006667-2-tps-200-200.png',
  outputPath: 'docs-dist',
  mode: 'site',
  // more config: https://d.umijs.org/config
});
