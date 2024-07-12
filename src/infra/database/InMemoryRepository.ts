import { FilterParams, Repository } from "@/application/interfaces";

interface Entity {
	id: number;
}

export class InMemoryRepository<T extends Entity> implements Repository<T> {

	public data: T[] = [];

	constructor(data?: T[]) {
		if(data) {
			this.data = data;
		}
	}

	async list(): Promise<T[]> {
		return this.data;
	}

	async get(id: number): Promise<T | null> {
		return this.data.find((entity) => entity.id === id) || null;
	}

	async find(field: keyof T, value: any): Promise<T | null> {
		return this.data.find((entity) => entity[field] === value) || null;
	}

	async filter(params: FilterParams<T>[]): Promise<T[] | null> {
		const result = this.data.filter(objeto => {
			return params.every(condicao => {
				return objeto[condicao.field] === condicao.value;
			});
		});

		return result.length > 0 ? result : null;
	}

	async create(entity: any): Promise<T> {
		this.data.push(entity);
		return entity;
	}

	async edit(entity: any): Promise<T | null> {
		const index = this.data.findIndex((e) => e.id === entity.id);
		if (index !== -1) {
			this.data[index] = entity;
			return entity;
		}
		return null;

	}

	async editField(id: number, field: keyof T, value: any): Promise<T | null> {
		const index = this.data.findIndex((e) => e.id === id);
		if (index !== -1) {
			this.data[index][field] = value;
			return this.data[index];
		}
		return null
	}

	async remove(id: number): Promise<void> {
		const index = this.data.findIndex((e) => e.id === id);
		if (index !== -1) {
			this.data.splice(index, 1);
		}
	}
}
