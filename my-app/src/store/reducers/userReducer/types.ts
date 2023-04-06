import { IUser } from "../../actions/userActions/types";

export interface UserState {
  user: IUser | null;
  message: null | string;
  loading: boolean;
  isAuth: boolean;
}

export enum UserActionTypes {
  START_REQUESTS_USER = "START_REQUESTS_USER",
  LOGOUT_USER = "LOGOUT_USER",
  SERVER_USER_ERROR = "SERVER_USER_ERROR",
  SUCCESSFUL_LOGIN_USER = "SUCCESSFUL_LOGIN_USER",
  SUCCESSFUL_REQUEST_LOGIN_USER = "SUCCESSFUL_REQUEST_LOGIN_USER",
  SUCCESSFUL_REQUEST_REGISTER_USER = "SUCCESSFUL_REQUEST_REGISTER_USER",
}

interface StartRequestAction {
  type: UserActionTypes.START_REQUESTS_USER;
}
interface LogoutUserAction {
  type: UserActionTypes.LOGOUT_USER;
}
interface SERVER_USER_ERROR {
  type: UserActionTypes.SERVER_USER_ERROR;
  payload: any;
}
interface SuccessfulLoginUser {
  type: UserActionTypes.SUCCESSFUL_LOGIN_USER;
  payload: any;
}
interface SuccessfulRequestLoginUserAction {
  type: UserActionTypes.SUCCESSFUL_REQUEST_LOGIN_USER;
  payload: any;
}
interface SuccessfulRegisterUserAction {
  type: UserActionTypes.SUCCESSFUL_REQUEST_REGISTER_USER;
  payload: any;
}
export type UserActions =
  | StartRequestAction
  | SuccessfulRegisterUserAction
  | SERVER_USER_ERROR
  | SuccessfulRequestLoginUserAction
  | SuccessfulLoginUser
  | LogoutUserAction;
