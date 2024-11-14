import { parse } from "csv-parse"

export const csv = {
	parse: () => {
		return parse({delimiter: ',', columns: true});
	}
}
