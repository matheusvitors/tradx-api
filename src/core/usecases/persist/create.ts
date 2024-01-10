import { Repository } from "@/core/interfaces";

interface CreateParams<T> {
	repository: Repository<T>;
	data: T;
}

export const create = async <T>({ repository, data }: CreateParams<T>): Promise<T> => {
	return await repository.create(data);
}
