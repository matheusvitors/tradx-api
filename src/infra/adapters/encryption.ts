import { ROUNDS } from '@/infra/config/environment';
import bcrypt from 'bcrypt';

export const encrypt = async (password: string): Promise<string> => {
	try {
		if(ROUNDS) {
			const salt = await bcrypt.genSalt(parseInt(ROUNDS));
			return await bcrypt.hash(password, salt);
		}

		throw new Error('On Encrypt - Env variable is undefined');
	} catch (error: any) {
		throw error;
	}
}

export const verifyHash = async (password: string, encrypted: string): Promise<boolean> => {
	return await bcrypt.compare(password, encrypted);
}
