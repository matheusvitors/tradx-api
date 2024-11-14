export interface Repository<T> {
	list(): Promise<T[]>;
	get(id: string): Promise<T | null>;
	find?(field: any, value: any): Promise<T | null>;
	filter?(params: any[]): Promise<T[] | null>;
	create(data: T | any): Promise<T>;
	batchCreation?(data: T[] | any): Promise<void>;
	edit(data: T | any): Promise<T | null>;
	remove(id: string): Promise<void>;
	rollback?(): Promise<void>;
}

