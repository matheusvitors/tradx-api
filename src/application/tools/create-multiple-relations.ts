import { Relation } from "@/application/interfaces";

export const createMultipleRelations = <T extends any[]>(...rels: { [k in keyof T]: Relation<T[k]>}) => {
	return rels;
}
