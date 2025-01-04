import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite';
import dynamicImport from 'vite-plugin-dynamic-import'
import { minifyHTMLPlugin } from './.vite/vite-plugin-minify-html';

// eslint-disable-next-line import/no-default-export
export default defineConfig((_env) => {
  return {
    server: {
      open: true,
    },
    build: {
      assetsDir: '.',
      rollupOptions: {
        output: {
          assetFileNames: '[hash][extname]',
          chunkFileNames: '[hash].js',
          entryFileNames: '[hash].js',
          hashCharacters: 'hex',
        },
      },
    },
    esbuild: {
      legalComments: 'none', // `external` is not supported in Vite
      target: ['chrome73', 'safari12.1', 'ios12.2'],
    },
    plugins: [
      UnoCSS({
        mode: 'shadow-dom',
      }),
      dynamicImport(),
      minifyHTMLPlugin({
        collapseWhitespace: true,
        generateSourceMap: false,
        minifyCSS: true,
        minifyJS: true,
      }),
    ],
  };
});
