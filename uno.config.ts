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
      default: 'var(--ak-text-color)',
    },
    backgroundColor: {
      default: 'var(--ak-bg-color)',
    },
  },
  preflights: [
    {
      getCSS: () => `:root {
        --ak-text-color: #333;
        --ak-bg-color: #fff;
      }
      :root.dark {
        --ak-text-color: #fff;
        --ak-bg-color: #333;
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
