export interface FilterParams<T> {
	field: keyof T;
	value: any | { lte: Date; gte: Date };
}
