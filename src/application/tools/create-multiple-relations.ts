import { ResourceRelation } from "@/application/interfaces";

export const createMultipleRelations = <T extends any[]>(...rels: { [k in keyof T]: ResourceRelation<T[k]>}) => {
	return rels;
}
