import { Repository, ParentRelation } from "@/application/interfaces";
import { forbbiden, notFound, serverError, success } from "@/infra/adapters/response-wrapper";

interface GetControllerParams<T, D> {
	repository: Repository<T, D>
	id: string;
	parent?: ParentRelation<T>;
}

export const getController = async <T, D>(params: GetControllerParams<T, D>) => {
	try {
		const { repository, id, parent } = params;

		const data = await repository.get(id);

		if(!data) {
			return notFound();
		}

		if(parent){
			console.log(data, [parent.field as keyof T]  , parent.id);

			if(data[parent.field as keyof T] !== parent.id){
				return forbbiden()
			}
		}

		return success(data);
	} catch (error) {
		return serverError(error);
	}
}
