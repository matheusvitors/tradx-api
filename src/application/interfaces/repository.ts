export interface Repository<T> {
	list(): Promise<T[]>;
	get(id: string): Promise<T | null>;
	find?(field: any, value: any): Promise<T | null>;
	filter?(params: any[]): Promise<T[] | null>;
	create(input: T | any): Promise<void>;
	batchCreation?(data: T[] | any): Promise<void>;
	edit(input: T | any): Promise<T | null>;
	remove(id: string): Promise<void>;
	rollback?(): Promise<void>;
}

