import { Repository } from "@/application/interfaces/repository";

export interface ResourceRelation <T, D> {
	id: string;
	repository: Repository<T, D>;
	notFoundMessage?: string;
}
