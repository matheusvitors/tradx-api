import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
	test: {
		name: 'unit',
		environment: 'node',
		include: ['./src/**/*.{spec}.?(c|m)[jt]s?(x)']
	},
});
