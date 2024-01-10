import { Repository } from "@/core/interfaces";

interface RemoveParams<T> {
	repository: Repository<T>;
	id: string;
}

export const remove = async <T>({ repository, id }: RemoveParams<T>): Promise<void> => {
	return await repository.remove(id);
}
