import {
  defineConfig,
  presetIcons,
  presetMini,
  transformerDirectives,
} from 'unocss';

export default defineConfig({
  content: {
    filesystem: ['**/*.html', '**/*.ts'],
  },
  presets: [
    presetMini(),
    presetIcons(),
  ],
  transformers: [transformerDirectives()],
  preflights: [
    {
      getCSS: () => `body {
        @apply p-12 bg-white text-black transition-colors dark:bg-black dark:text-white;
      }`,
      layer: 'base',
    },
  ],
  layers: {
    base: -1,
    utilities: 1,
    components: 2,
  },
});
