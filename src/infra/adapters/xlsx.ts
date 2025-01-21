import xlsx from "xlsx";

export const xls = {
	read: (file: string) => {
		return xlsx.readFile(
			file,
		);
	},
	json: (sheet: any) => {
		return xlsx.utils.sheet_to_json(sheet, {
			raw: false,
		});
	}
}
