import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom', // Use jsdom for browser-like environment
    globals: true, // Enable globals like `expect` and `describe`
  },
});