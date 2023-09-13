import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  entry: ['src/index.ts'],
  skipNodeModulesBundle: true,
  format: ['esm'],
  minify: true,
  splitting: true,
})
