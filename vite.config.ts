import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite';
import dynamicImport from 'vite-plugin-dynamic-import'
import { minifyHTMLLiteralsPlugin } from './vite/minify-html-literals';
import { minifyIndexHTMLPlugin } from './vite/minify-index-html';

// eslint-disable-next-line import/no-default-export
export default defineConfig(({ mode }) => {

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
      minifyHtml: {
        collapseWhitespace: true,
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
      minifyIndexHTMLPlugin({
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
      }),
      minifyHTMLLiteralsPlugin({
        generateSourceMap: false,
        minifyOptions: {
          collapseWhitespace: true,
        },
      }),
    ],
  };
});
