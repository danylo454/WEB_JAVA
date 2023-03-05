export interface ICategoryCreate {
  name: string;
  description: string;
  base64: string;
}
export interface ICategoryUpdate {
  id: number;
  name: string;
  description: string;
  newImage: string | null;
}
