import { Repository } from "@/core/interfaces";

interface EditParams<T> {
	repository: Repository<T>;
	data: T;
}

export const edit = async <T>({ repository, data }: EditParams<T>): Promise<T | null> => {
	return await repository.edit(data);
}
