import { parse } from "csv-parse"

export const csv = {
	parse: (file: string) => {
		return parse({delimiter: ',', columns: true});
	}
}
