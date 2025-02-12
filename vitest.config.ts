import { defineConfig } from 'vitest/config';

export default defineConfig((_env) => {
  return {
    test: {
      include: ['**/*.test.ts'],
      exclude: ['**/node_modules/**'],
      coverage: {
        reporter: [
          ['json-summary'],
          ['json'],
          ['lcov', { projectRoot: './src' }],
          ['text'],
        ],
      },
    },
  };
});
