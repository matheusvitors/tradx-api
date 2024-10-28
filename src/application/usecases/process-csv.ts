import { createReadStream } from "fs";
import { csv } from "@/infra/adapters/csv";

export const processCsv = async (file: string, callback: (row: string) => void): Promise<boolean> => {
	console.log(file);

	try{
		createReadStream(file)
		.pipe(csv.parse())
		.on('data', async (row) => {
			callback(row);
		})
		.on('error', async (error) => {
			console.error(error)
			throw error;
		})
		.on('end', async () => {
			console.log('Arquivo processado!');
		})
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
}
