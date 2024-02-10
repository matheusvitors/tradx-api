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
		setupFiles: ["dotenv/config"], //this line,
	},
	resolve: {
		alias: [{ find: '@', replacement: path.resolve(__dirname, './src') }],
	},
});
