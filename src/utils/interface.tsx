export interface LoginRequestBody {
    name: string;
    email: string;
}
  
export interface QueryParameters {
    breeds: null | string[];
    zipCodes: null | string[];
    ageMin: null | string;
    ageMax: null | string;
    size?: null | number;
    from?: null | number;
    sort?: null | string
}

export interface Dog {
	id: string;
	img: string;
	name: string;
	age: number;
	zip_code: string;
	breed: string;
}

export interface PageInfo {
    count: number;
    from: number;
    to: number;
    idsinpage: 25;
}

export interface SearchResponse {
	resultIds: string[];
	total: number;
	next?: string;
	prev?: string;
}
