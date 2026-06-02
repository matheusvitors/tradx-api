export interface ParentRelation<T> {
	field: keyof T;
	id: string;
}
