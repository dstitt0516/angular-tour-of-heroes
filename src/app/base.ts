export interface Base {
    id: number;
    name: string;
}

export interface City extends Base {
}

export interface Hero extends Base {
  cityid: number;
}