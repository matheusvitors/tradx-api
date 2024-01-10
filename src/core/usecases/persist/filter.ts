import { Repository } from "@/core/interfaces";

interface FilterParams<T> {
	repository: Repository<T>;
	field: keyof T;
	value: any;
}

export const filter = async <T>({ repository, field, value }: FilterParams<T>): Promise<T[] | null> => {
	return await repository.filter(field, value);
};
