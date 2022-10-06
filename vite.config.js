import { URL, fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), AutoImport({
    imports: [
      // presets
      'vue',
      'vue-router',
      {
        'nanoid': [
          'nanoid',
          'customAlphabet',
        ],
        'lodash-es': [
          'debounce',
          'cloneDeep',
          'isNumber',
        ],
      },

    ],
  })],
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // css预处理
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/index.scss";',
      },
    },
  },
});
