import { createReadStream, existsSync } from "fs";
import { csv } from "@/infra/adapters/csv";
import { operacaoCsvValidator } from "@/application/validators";

export const validateOperacoesCsv = async (file: string): Promise<boolean> => {
	try {
		let isValid = true;

		if(!existsSync(file)) {
			return false;
		}

		await new Promise((resolve, reject) => {
			createReadStream(file)
				.pipe(csv.parse())
				.on('data', async (row) => {
					isValid = await operacaoCsvValidator(row);
					!isValid && resolve(false);
				})
				.on('error', async (error) => {
					console.error('process csv error',error);
					isValid = false;
					reject(error)
				})
				.on('end', async () => {
					resolve(isValid);
				});
		})

		return isValid;
	} catch (error) {
		return false;
	}
}
