export interface Repository<T> {
	list(): Promise<T[]>;
	get(id: number): Promise<T | null>;
	find?(field: any, value: any): Promise<T | null>
	filter?(params: any[]): Promise<T[] | null>
	create(data: T | any): Promise<T>;
	edit(data: T | any): Promise<T | null>;
	remove(id: number): Promise<void>;
}

