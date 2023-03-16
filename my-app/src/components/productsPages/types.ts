export interface IProduct {
  name: string;
  price: number;
  description: string;
  category_id: string;
  files: Array<File>;
}

export interface IEditItemProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  category_id: string;
  files: Array<String>;
  newFile: Array<File>;
}
export interface IEditItemPostProduct {
  name: string;
  price: number;
  description: string;
  category_id: string;
  removeFiles: Array<String>;
  files: Array<File>;
}

export interface IItemProduct {
  id: number;
  name: string;
  price: string;
  description: string;
  category: string;
  files: Array<String>;
}
