import { ValidationError } from "@/application/errors";
import { FilterParams, Repository } from "@/application/interfaces"
import { validateConta } from "@/core/validators";
import { newID } from "@/infra/adapters/newID";
import { conflict, created, serverError, success, unprocessableEntity } from "@/infra/adapters/response-wrapper";


interface CreateControllerParams<T, D> {
	repository: Repository<T>;
	input: Omit<D, 'id'>;
	uniqueFields?: Array<keyof Omit<D, 'id'>>
	validate: <D>(input: Omit<D, 'id'>) => void;
}

export const createController = async <T, D>(params: CreateControllerParams<T, D>) => {
	try {

		const { input, repository, validate, uniqueFields } = params;

		if(uniqueFields) {
			const filterParams: FilterParams<D>[] = uniqueFields.map<FilterParams<D>>(field => ({ field, value: input[field]}))

			const result = repository.filter && await repository.filter(filterParams);
			if(result) {
				return conflict()
			}
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
