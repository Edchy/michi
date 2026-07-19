import { defineConfig } from "vitest/config";

export default defineConfig({
  // The engine is pure logic — no CSS. Skip Next's PostCSS/Tailwind config,
  // which Vite can't parse (string-form plugins are Next's loader, not Vite's).
  css: { postcss: { plugins: [] } },
  test: {
    globals: true,
  },
});
