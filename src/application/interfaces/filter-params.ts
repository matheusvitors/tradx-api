export interface FilterParams<T> {
	field: keyof T;
	value: any;
}
