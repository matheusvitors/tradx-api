import { Repository } from "@/application/interfaces";

interface CreateParams<T> {
	repository: Repository<T>;
	data: any;
}

export const create = async <T>({ repository, data }: CreateParams<T>): Promise<T> => {
	return await repository.create(data);
}
