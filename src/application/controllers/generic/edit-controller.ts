import { ValidationError } from "@/application/errors";
import { FilterParams, Repository, ResponseData } from "@/application/interfaces";
import { success, unprocessableEntity, serverError, notFound, conflict } from "@/infra/adapters/response-wrapper";

interface EditControllerParams<D> {
	repository: Repository<D>;
	input: D & {id: string};
	uniqueFields?: Array<keyof Omit<D, 'id'>>
	validate: <D>(input: D) => void;
}

export const editController = async <D>(params: EditControllerParams<D>): Promise<ResponseData> => {

	try {
		const {input, repository, uniqueFields, validate} = params;

		if(!input.id) {
			return unprocessableEntity('O id da conta é obrigatório.')
		}

		validate(input);

		const data = await repository.get(input.id);

		if(!data) {
			return notFound();
		}


		// const changedUniqueFields: Array<string | number | symbol> = [];
		const changedUniqueFields: Array<keyof D> = [];

		if(uniqueFields) {
			uniqueFields.forEach(async (field: keyof D) => {
				console.log(field, input[field], data[field]);
				if(input[field] !== data[field]){
					changedUniqueFields.push(field);
				}
			})
		}

		if(changedUniqueFields.length > 0){
			const filterParams: FilterParams<D>[] = changedUniqueFields.map<FilterParams<D>>(field => ({ field, value: input[field]}))

			const result = repository.filter && await repository.filter(filterParams);
			if(result) {
				return conflict()
			}

		}
		await repository.edit(input)
		return success();

	} catch (error) {
		if(error instanceof ValidationError) {
			return unprocessableEntity(error.message);
		}
		return serverError(error);
	}
}
