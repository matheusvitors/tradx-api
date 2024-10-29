import { processCsv } from "@/application/usecases/process-csv";
import path from "path";
import { describe, expect, it } from "vitest";

describe.only('Process csv file', () => {
	it('should process csv content', () => {
		const csvPath = path.join('tests', 'assets', 'test.csv');
		expect(() => processCsv(csvPath, async (row) => console.log(row))).toBeTruthy();
	});
});
