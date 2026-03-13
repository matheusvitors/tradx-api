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
		setupFiles: ["dotenv/config"],
		reporters: ['html']
	},
	resolve: {
		alias: [{ find: '@', replacement: path.resolve(__dirname, './src') }],
	},
});
