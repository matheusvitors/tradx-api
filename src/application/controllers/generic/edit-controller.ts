import { ValidationError } from "@/application/errors";
import { FilterParams, Repository, ResourceRelation, ResponseData } from "@/application/interfaces";
import { success, unprocessableEntity, serverError, notFound, conflict } from "@/infra/adapters/response-wrapper";

interface EditControllerParams<T, D> {
	repository: Repository<T, D>;
	input: D & {id: string};
	uniqueFields?: Array<keyof Omit<D, 'id'>>
	validate: (input: D) => void;
	relations?: ResourceRelation<D>[];
}

export const editController = async <T, D>(params: EditControllerParams<T, D>): Promise<ResponseData> => {

	try {
		const {input, repository, uniqueFields, validate, relations} = params;

		if(!input.id) {
			return unprocessableEntity('O id da conta é obrigatório.')
		}

		validate(input);

		const data = await repository.get(input.id);

		if(!data) {
			return notFound();
		}

		if(relations){
			relations.forEach(async relation => {
				const savedItem = await relation.repository.get(relation.id);

				if(!savedItem){
					return notFound();
				}
			})
		}

		const changedUniqueFields: Array<keyof D> = [];

		if(uniqueFields) {
			const dataAsD = data as D;
			for (const field of uniqueFields) {
				if(input[field] !== dataAsD[field]){
					changedUniqueFields.push(field);
				}
			}
		}

		if(changedUniqueFields.length > 0){
			const filterParams: FilterParams<D>[] = changedUniqueFields.map<FilterParams<D>>(field => ({ field, value: input[field]}))

			const result = await repository.filter!(filterParams);
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
