import { createReadStream } from "fs";
import { csv } from "@/infra/adapters/csv";

export const processCsv = async (file: string, callback: (row: any) => Promise<void>): Promise<boolean> => {
	try{
		createReadStream(file)
		.pipe(csv.parse())
		.on('data', async (row) => await callback(row))
		.on('error', async (error) => {
			console.error('process csv error',error)
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
