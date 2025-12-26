





export interface Pokemon {
    id: number;
    name: string;
    types: string[];
    image: string;
}


export interface Type {
    id: number;
    name: string;
    image: string;
}


export interface Filter {
  idOrName?: string | number | undefined;
  selectedType?: string | undefined;
}
