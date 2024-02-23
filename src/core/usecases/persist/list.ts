import { Repository } from "@/application/interfaces";

export const list = async <T>(repository: Repository<T>): Promise<T[]> => {
	return await repository.list();
}
