import { Repository } from "@/application/interfaces/repository";

export interface ResourceRelation <D> {
	id: string;
	repository: Repository<D>;
}
