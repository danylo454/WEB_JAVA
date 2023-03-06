export interface ICategoryCreate {
  name: string;
  description: string;
  file: File | null;
}
export interface ICategoryUpdate {
  id: number;
  name: string;
  description: string;
  newImage: string | null;
}
