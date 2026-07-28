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
		setupFiles: ["dotenv/config", "./__tests__/e2e/setup.ts"],
	},
	resolve: {
		alias: [{ find: '@', replacement: path.resolve(__dirname, './src') }],
	}
});
