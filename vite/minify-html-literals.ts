import { DefaultOptions, minifyHTMLLiterals } from 'minify-html-literals';
import { Plugin } from 'vite';

export function minifyHTMLLiteralsPlugin(options: DefaultOptions): Plugin {
  return {
    name: 'minify-html-literals-plugin',
    enforce: 'pre',
    transform(code) {
      return minifyHTMLLiterals(code, options)?.code || code;
    },
  };
}
