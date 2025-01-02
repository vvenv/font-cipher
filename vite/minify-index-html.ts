import { minify, Options } from 'html-minifier';
import { Plugin } from 'vite';

export function minifyIndexHTMLPlugin(options: Options): Plugin {
  return {
    name: 'minify-index-html-plugin',
    transformIndexHtml(html) {
      return {
        html: minify(html, options),
        tags: [],
      };
    },
  };
}
