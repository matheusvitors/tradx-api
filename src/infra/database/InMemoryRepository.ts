import { FilterParams, Repository } from "@/application/interfaces";

interface Entity {
	id: string;
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

	async get(id: string): Promise<T | null> {
		return this.data.find((entity) => entity.id === id) || null;
	}

	async find(field: keyof T, value: any): Promise<T | null> {
		return this.data.find((entity) => entity[field] === value) || null;
	}

	async filter(params: FilterParams<T>[]): Promise<T[] | null> {
		console.log(this.data);
		console.log(params);


		const result = this.data.filter(objeto => {
			return params.every(condicao => {
				return objeto[condicao.field] === condicao.value;
			});
		});

		console.log(result);

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

	async editField(id: string, field: keyof T, value: any): Promise<T | null> {
		const index = this.data.findIndex((e) => e.id === id);
		if (index !== -1) {
			this.data[index][field] = value;
			return this.data[index];
		}
		return null
	}

	async remove(id: string): Promise<void> {
		const index = this.data.findIndex((e) => e.id === id);
		if (index !== -1) {
			this.data.splice(index, 1);
		}
	}
}
