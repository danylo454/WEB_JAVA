export interface UserState {
  user: IUserItem | null;
  message: null | string;
  loading: boolean;
  isAuth: boolean;
}

interface IUserItem {
  id: number;
  name: string;
  price: string;
  description: string;
  category: string;
  files: Array<String>;
}

export enum UserActionTypes {
  START_REQUEST = "START_REQUEST",
  SERVER_USER_ERROR = "SERVER_USER_ERROR",
  SUCCESSFUL_REQUEST_REGISTER_USER = "SUCCESSFUL_REQUEST_REGISTER_USER",
}

interface StartRequestAction {
  type: UserActionTypes.START_REQUEST;
}
interface SERVER_USER_ERROR {
  type: UserActionTypes.SERVER_USER_ERROR;
  payload: any;
}
interface SuccessfulRegisterUserAction {
  type: UserActionTypes.SUCCESSFUL_REQUEST_REGISTER_USER;
  payload: any;
}
export type UserActions =
  | StartRequestAction
  | SuccessfulRegisterUserAction
  | SERVER_USER_ERROR;
