import { HttpStatusCode } from "@/infra/types";

export interface ResponseData {
	status: HttpStatusCode;
	body?: any;
}
