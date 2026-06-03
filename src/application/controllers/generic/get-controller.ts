import { Repository, OwnerRelation } from "@/application/interfaces";
import { forbbiden, notFound, serverError, success } from "@/infra/adapters/response-wrapper";

interface GetControllerParams<T, D> {
	repository: Repository<T, D>
	id: string;
	owner?: OwnerRelation<T>;
}

export const getController = async <T, D>(params: GetControllerParams<T, D>) => {
	try {
		const { repository, id, owner } = params;

		const data = await repository.get(id);

		if(!data) {
			return notFound();
		}

		if(owner){
			if(data[owner.field as keyof T] !== owner.id){
				return forbbiden()
			}
		}

		return success(data);
	} catch (error) {
		return serverError(error);
	}
}
