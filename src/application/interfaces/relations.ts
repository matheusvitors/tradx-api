import { Repository } from "@/application/interfaces/repository";

export interface Relation <T, D> {
	id: string;
	repository: Repository<T, D>;
	errorMessage?: string;
}
