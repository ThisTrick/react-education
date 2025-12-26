

export interface Item {
    id: number;
    name: string;
}



export interface Pokemon extends Item {
    types: string[];
    image: string;
}


export interface Type extends Item {
    image: string;
}


export interface Filter {
  idOrName?: string | number | undefined;
  selectedType?: string | undefined;
}
