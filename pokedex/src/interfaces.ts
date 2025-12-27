export interface Filter {
  idOrName?: string | number | undefined;
  selectedType?: string | undefined;
  selectedColor?: string | undefined;
  selectedHabitat?: string | undefined;
}

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

export interface Color extends Item {
    name: string;
    bgHex: string;
    textHex: string;
}

export interface Habitat extends Item {
    name: string;
}
