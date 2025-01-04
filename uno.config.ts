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
  theme: {
    colors: {
      default: 'rgb(var(--ak-text-color) / <alpha-value>)',
    },
    backgroundColor: {
      default: 'rgb(var(--ak-bg-color) / <alpha-value>)',
    },
  },
  preflights: [
    {
      getCSS: () => `:root {
        --ak-text-color: 40 44 52;
        --ak-bg-color: 171 178 191;
      }
      :root.dark {
        --ak-text-color: 171 178 191;
        --ak-bg-color: 40 44 52;
      }
      body {
        @apply p-12 bg-default text-default transition-colors;
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
