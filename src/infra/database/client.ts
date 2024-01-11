import { PrismaClient } from "@prisma/client";

const databaseClient = new PrismaClient({
	log: ['info', 'warn', 'error'],
	errorFormat: 'pretty'
});

export { databaseClient }
