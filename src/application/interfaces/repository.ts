export interface Repository<T, D> {
	list(): Promise<T[]>;
	get(id: string): Promise<T | null>;
	find?(field: keyof D, value: any): Promise<T | null>;
	filter?(params: any[]): Promise<T[] | null>;
	create(input: D): Promise<void>;
	batchCreation?(data: T[] | any): Promise<void>;
	edit(input: D): Promise<void>;
	remove(id: string): Promise<void>;
	rollback?(): Promise<void>;
}

