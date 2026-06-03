import { ValidationError } from "@/application/errors";
import { FilterParams, Repository, Relation } from "@/application/interfaces"
import { newID } from "@/infra/adapters/newID";
import { conflict, created, notFound, serverError, success, unprocessableEntity } from "@/infra/adapters/response-wrapper";


interface CreateControllerParams<T, D> {
	repository: Repository<T, D>;
	input: D;
	uniqueFields?: Array<keyof D>
	validate: (input: D) => void;
	relations?: Relation<any, any>[];
}

export const createController = async <T, D>(params: CreateControllerParams<T, D>) => {
	try {

		const { input, repository, validate, uniqueFields, relations } = params;

		const finalInput = {...input, id: newID()}

		if(uniqueFields) {
			const filterParams: FilterParams<D>[] = uniqueFields.map<FilterParams<D>>(field => ({ field, value: finalInput[field]}))

			const result = repository.filter && await repository.filter(filterParams);

			if(result && result.length > 0) {
				return conflict()
			}
		}

		if(relations){
			for(const relation of relations) {

				const savedItem = await relation.repository.get(relation.id);

				if(!savedItem){
					return notFound(relation.errorMessage)
				}
			}
		}

		validate(finalInput);
		await repository.create(finalInput);

		return created();
	} catch (error: any) {
		if(error instanceof ValidationError) {
			return unprocessableEntity(error.message);
		}
		return serverError(error);
	}
}
