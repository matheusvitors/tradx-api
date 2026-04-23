import { ValidationError } from "@/application/errors";
import { FilterParams, Repository, ResourceRelation } from "@/application/interfaces"
import { conflict, created, notFound, serverError, success, unprocessableEntity } from "@/infra/adapters/response-wrapper";


interface CreateControllerParams<T, D> {
	repository: Repository<T>;
	input: Omit<D, 'id'>;
	uniqueFields?: Array<keyof Omit<D, 'id'>>
	validate: <D>(input: Omit<D, 'id'>) => void;
	relations?: ResourceRelation<D>[];
}

export const createController = async <T, D>(params: CreateControllerParams<T, D>) => {
	try {

		const { input, repository, validate, uniqueFields, relations } = params;

		if(uniqueFields) {
			const filterParams: FilterParams<D>[] = uniqueFields.map<FilterParams<D>>(field => ({ field, value: input[field]}))

			const result = repository.filter && await repository.filter(filterParams);
			if(result) {
				return conflict()
			}
		}

		if(relations){
			relations.forEach(async relation => {
				const savedItem = await relation.repository.get(relation.id);

				if(!savedItem){
					return notFound();
				}
			})
		}

		validate<D>(input);
		await repository.create(input);

		return created();
	} catch (error: any) {
		if(error instanceof ValidationError) {
			return unprocessableEntity(error.message);
		}
		return serverError(error);
	}
}
