import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
	root: ".",
	esbuild: {
		tsconfigRaw: "{}",
	},
	test: {
		clearMocks: true,
		globals: true,
		setupFiles: ["dotenv/config", './__tests__/setup.ts'],
		projects: [
			'./vitest.config.e2e.ts',
			'./vitest.config.unit.ts'
		]
	},
	resolve: {
		alias: [{ find: '@', replacement: path.resolve(__dirname, './src') }],
	},
});
