import { DATABASE_URL } from "@/infra/config/environment";
import { drizzle } from "drizzle-orm/mysql2";

const database = drizzle(DATABASE_URL!);

export { database }
