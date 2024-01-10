import { Repository } from "@/core/interfaces";

interface GetParams<T> {
	repository: Repository<T>;
	id: string;
}

export const get = async <T>({ repository, id }: GetParams<T>): Promise<T | null> => {
	return await repository.get(id);
}
