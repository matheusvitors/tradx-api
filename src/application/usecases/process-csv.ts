import { createReadStream, ReadStream } from "fs";
import { csv } from "@/infra/adapters/csv";

export const processCsv = async (file: string, callback: (row: any, stream: ReadStream) => Promise<boolean>): Promise<boolean> => {
	try{
		return new Promise((resolve, reject) => {
			const stream = createReadStream(file);
			stream
			.pipe(csv.parse())
			.on('data', async (row) => await callback(row, stream))
			.on('error', async (error) => {
				console.error('process csv error',error)
				reject(error);
			})
			.on('end', async () => {
				console.log('Arquivo processado!');
			})
			resolve(true);
		})
	} catch (error) {
		console.log('process csv', error);
		return false;
	}
}
