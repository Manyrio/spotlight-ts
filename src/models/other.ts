
export enum Scope {
    Cast = "Office de Saint Cast",
    Caulnes = "Office de Saint Cast Le Guildo"
}


export interface ObjectInterface {
    attributes: any
    id: string;

}

export class ApiListResponse<T> {
    constructor(
        public data: T[] = [],
        public meta: { pagination: { page: number, pageSize: number, pageCount: number, total: number } } = { pagination: { page: 1, pageSize: 1, pageCount: 1, total: 1 } }
    ) {
        this.data = data;
        this.meta = meta;
    }
}


export class ApiRetrieveResponse<T> {
    constructor(
        public data: T = {} as T,
        public meta: { pagination: { page: number, pageSize: number, pageCount: number, total: number } } = { pagination: { page: 1, pageSize: 1, pageCount: 1, total: 1 } }
    ) {
        this.data = data;
        this.meta = meta;
    }
}


