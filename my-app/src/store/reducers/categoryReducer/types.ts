export interface CategoryState {
  categories: Array<IItemCategory>;
  message: null | string;
  loading: boolean;
  categoryForUpdate: IItemCategory;
}

interface IItemCategory {
  id: number;
  name: string;
  image: string;
  description: string;
}

export enum CategoryActionTypes {
  START_REQUEST = "START_REQUEST",
  REMOVE_CATEGORY_SUCCESSFUL = "REMOVE_CATEGORY_SUCCESSFUL",
  SET_ID_CATEGORY_FOR_UPDATE = "SET_ID_CATEGORY_FOR_UPDATE",
  SERVER_CATEGORY_ERROR = "SERVER_CATEGORY_ERROR",
  SUCCESSFUL_REQUEST_LIST_CATEGORYES = "SUCCESSFUL_REQUEST_LIST_CATEGORYES",
  SUCCESSFUL_REQUEST_CATEGORY_BY_ID = "SUCCESSFUL_REQUEST_CATEGORY_BY_ID",
  SUCCESSFUL_REQUEST_CREATE_CATEGORY = "SUCCESSFUL_REQUEST_CREATE_CATEGORY",
  SUCCESSFUL_REQUEST_UPDATE_CATEGORY = "SUCCESSFUL_REQUEST_UPDATE_CATEGORY",
}

interface SUCCESSFUL_REQUEST_LIST_CATEGORYESAction {
  type: CategoryActionTypes.SUCCESSFUL_REQUEST_LIST_CATEGORYES;
  payload: any;
}
interface SUCCESSFUL_REQUEST_UPDATE_CATEGORYAction {
  type: CategoryActionTypes.SUCCESSFUL_REQUEST_UPDATE_CATEGORY;
  payload: any;
}
interface REMOVE_CATEGORY_SUCCESSFULAction {
  type: CategoryActionTypes.REMOVE_CATEGORY_SUCCESSFUL;
  payload: any;
}
interface SUCCESSFUL_REQUEST_CREATE_CATEGORYAction {
  type: CategoryActionTypes.SUCCESSFUL_REQUEST_CREATE_CATEGORY;
  payload: any;
}
interface SET_ID_CATEGORY_FOR_UPDATEAction {
  type: CategoryActionTypes.SET_ID_CATEGORY_FOR_UPDATE;
  payload: number;
}
interface SUCCESSFUL_REQUEST_CATEGORY_BY_IDAction {
  type: CategoryActionTypes.SUCCESSFUL_REQUEST_CATEGORY_BY_ID;
  payload: IItemCategory;
}
interface StartRequestAction {
  type: CategoryActionTypes.START_REQUEST;
}
interface SERVER_CATEGORY_ERRORAction {
  type: CategoryActionTypes.SERVER_CATEGORY_ERROR;
  payload: any;
}

export type CategoryesActions =
  | SUCCESSFUL_REQUEST_LIST_CATEGORYESAction
  | StartRequestAction
  | SERVER_CATEGORY_ERRORAction
  | SUCCESSFUL_REQUEST_CATEGORY_BY_IDAction
  | SET_ID_CATEGORY_FOR_UPDATEAction
  | SUCCESSFUL_REQUEST_CREATE_CATEGORYAction
  | REMOVE_CATEGORY_SUCCESSFULAction
  | SUCCESSFUL_REQUEST_UPDATE_CATEGORYAction;
