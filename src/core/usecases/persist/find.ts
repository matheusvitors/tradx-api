import { Repository } from "@/application/interfaces";

interface FindParams<T> {
	repository: Repository<T>;
	field: keyof T;
	value: any;
}

export const find = async <T>({ repository, field, value }: FindParams<T>): Promise<T | null> => {
	return await repository.find(field, value);
}
