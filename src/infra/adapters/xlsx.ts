import path from "path";
const xlsx = require("xlsx");

export const xls = {
	read: (file: string) => {
		return xlsx.readFile(
			path.join(__dirname, "..", "assets", "backtest-full.xlsx")
		);
	},
	json: (sheet: any) => {
		return xlsx.utils.sheet_to_json(
			sheet
		);
	}
}
