import { ValidationError } from "@/application/errors";
import { Repository, ResponseData } from "@/application/interfaces";
import { success, unprocessableEntity, serverError, notFound, conflict } from "@/infra/adapters/response-wrapper";

interface EditControllerParams<T, D> {
	repository: Repository<T>;
	input: D & {id: string};
	uniqueFields?: Array<keyof Omit<D, 'id'>>
	validate: <D>(input: D) => void;
}

export const editController = async <T, D>(params: EditControllerParams<T, D>): Promise<ResponseData> => {

	try {
		const {input, repository, uniqueFields, validate} = params
		validate(input);

		const data = await repository.get(input.id);

		if(!data) {
			return notFound();
		}

		if(uniqueFields) {
			uniqueFields.forEach(async (field: keyof D) => {
				if(input[field] !== data[field]) {
					// const ativoAcronimoVerification = await repository.find!('acronimo', input.acronimo);

					// if(ativoAcronimoVerification && ativoAcronimoVerification.id !== input.id) {
					// 	return conflict('Acronimo não pode ter duplicação');
					// }
				}
			})
		}


		await repository.edit(input)
		return success(input);

	} catch (error) {
		if(error instanceof ValidationError) {
			return unprocessableEntity(error.message);
		}
		return serverError(error);
	}
}
