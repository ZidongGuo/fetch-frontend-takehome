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
    sort?: 'asc' | 'desc';
}

