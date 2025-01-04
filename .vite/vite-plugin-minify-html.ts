import { minify, Options } from 'html-minifier';
import { BaseOptions, minifyHTMLLiterals } from 'minify-html-literals';
import { Plugin } from 'vite';

export function minifyHTMLPlugin(options: Options & BaseOptions): Plugin {
  return {
    name: 'minify-html',
    enforce: 'pre',
    transformIndexHtml(html) {
      return {
        html: minify(html, options),
        tags: [],
      };
    },
    transform(code) {
      return minifyHTMLLiterals(code, {
        generateSourceMap: options?.generateSourceMap ?? false,
        minifyOptions: {
          collapseWhitespace: options?.collapseWhitespace ?? true,
        }
      })?.code || code;
    },
  };
}
