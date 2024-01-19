export interface Repository<T> {
	list(): Promise<T[]>;
	get(id: string): Promise<T | null>;
	find(field: keyof T, value: any): Promise<T | null>
	filter(field: keyof T, value: any): Promise<T[] | null>
	create(data: T | any): Promise<T>;
	edit(data: T | any): Promise<T | null>;
	editField?(id: string, field: keyof T, value: any): Promise<T | null>;
	remove(id: string): Promise<void>;
}
