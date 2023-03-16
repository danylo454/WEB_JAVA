import { type } from "os";

export interface ProductsState {
  products: Array<IItemProduct>;
  message: null | string;
  loading: boolean;
  productForUpdate: IItemProduct;
}

interface IItemProduct {
  id: number;
  name: string;
  price: string;
  description: string;
  category: string;
  files: Array<String>;
}

export enum ProductActionTypes {
  START_REQUEST = "START_REQUEST",
  REMOVE_PRODUCT_SUCCESSFUL = "REMOVE_PRODUCT_SUCCESSFUL",
  SUCCESSFUL_REQUEST_GET_PRODUCT = "SUCCESSFUL_REQUEST_GET_PRODUCT",
  SUCCESSFUL_REQUEST__REMOVE_IMAGE_PRODUCT = "SUCCESSFUL_REQUEST__REMOVE_IMAGE_PRODUCT",
  SUCCESSFUL_UPDATE_PRODUCT = "SUCCESSFUL_UPDATE_PRODUCT",
  SERVER_PRODUCTS_ERROR = "SERVER_PRODUCTS_ERROR",
  SUCCESSFUL_REQUEST_LIST_PRODUCTS = "SUCCESSFUL_REQUEST_LIST_PRODUCTS",
  SUCCESSFUL_REQUEST_CREATE_PRODUCTS = "SUCCESSFUL_REQUEST_CREATE_PRODUCTS",
}

interface StartRequestAction {
  type: ProductActionTypes.START_REQUEST;
}
interface SuccessfulRemoveProductAction {
  type: ProductActionTypes.REMOVE_PRODUCT_SUCCESSFUL;
  payload: any;
}
interface ServerProductsErrorAction {
  type: ProductActionTypes.SERVER_PRODUCTS_ERROR;
  payload: any;
}
interface SuccessfulRequestRemoveImageProductAction {
  type: ProductActionTypes.SUCCESSFUL_REQUEST__REMOVE_IMAGE_PRODUCT;
  payload: any;
}
interface SuccessfulUpdateProductAction {
  type: ProductActionTypes.SUCCESSFUL_UPDATE_PRODUCT;
  payload: any;
}
interface SuccessfulGetProductAction {
  type: ProductActionTypes.SUCCESSFUL_REQUEST_GET_PRODUCT;
  payload: any;
}
interface SuccessfulCreateProductAction {
  type: ProductActionTypes.SUCCESSFUL_REQUEST_CREATE_PRODUCTS;
  payload: any;
}
interface SuccessfulRequestListProductsAction {
  type: ProductActionTypes.SUCCESSFUL_REQUEST_LIST_PRODUCTS;
  payload: any;
}

export type ProductsActions =
  | StartRequestAction
  | ServerProductsErrorAction
  | SuccessfulRequestListProductsAction
  | SuccessfulCreateProductAction
  | SuccessfulGetProductAction
  | SuccessfulUpdateProductAction
  | SuccessfulRequestRemoveImageProductAction
  | SuccessfulRemoveProductAction;
