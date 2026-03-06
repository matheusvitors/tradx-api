import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		name: 'e2e',
		environment: 'node',
		include: ['__tests__/**/*.{test}.?(c|m)[jt]s?(x)']
	},
});
