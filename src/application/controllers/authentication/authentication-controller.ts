import { Repository, ResponseData } from "@/core/interfaces";
import { Usuario } from "@/core/models";
import { jwt } from "@/infra/adapters/jwt";
import { notFound, serverError, success, unauthorized } from "@/infra/adapters/response-wrapper";

interface AuthenticationControllerParams {
	repository: Repository<Usuario>;
	username: string;
	password: string;
}

export const authenticationController = async (params: AuthenticationControllerParams): Promise<ResponseData> => {

	try {

		const { repository, username, password } = params;
		const usuario = await repository.find('username', username);

		if(!usuario) {
			return notFound('Usuário não encontrado.');
		}

		if(usuario.password !== password) {
			return unauthorized('Senha incorreta.')
		}

		const token = jwt.encode({payload: {auth: true, id: usuario.id}});
		return success({token});
	} catch (error) {
		console.error(error);
		return serverError(error)
	}

}
