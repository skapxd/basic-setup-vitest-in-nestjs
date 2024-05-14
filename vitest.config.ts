import 'dotenv/config';

import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
import tsConfig from "./tsconfig.json"
import { resolve } from 'path';

const testResultDir = resolve(__dirname, 'test-reporter'); 

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      // provider: 'istanbul',
      provider: 'v8',
      reporter: ['html'],
      reportsDirectory: resolve(testResultDir, 'coverage'),
      include: [
        'src/**/*.ts',
      ],
      exclude: [
        '**/**.module.ts',
        '**/main.ts',
      ]
    },
    outputFile: resolve(testResultDir, 'index.html'),
    reporters: [
      'default',
      "html",
    ],
    globals: true,
    root: './',
    alias: {
      // @ts-ignore
      '#/': new URL(tsConfig.compilerOptions.baseUrl, import.meta.url).pathname
    },
  },
  plugins: [
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
});
