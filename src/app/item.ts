export interface Item {
    id: number;
    name: string;
}

export interface City extends Item {
}

export interface Hero extends Item {
  cityid: number;
}