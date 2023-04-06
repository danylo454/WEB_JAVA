import { register, login } from "../../../services/api-user-service";
import { Dispatch } from "react";
import { UserActions, UserActionTypes } from "../../reducers/userReducer/types";
import { toast } from "react-toastify";
import { IUser } from "./types";
import jwtDecode from "jwt-decode";
import setAuthToken from "../../../services/setAuthToken";
import { IRegisterUser } from "../../../components/auth/types";

export const RegisterUser = (user: IRegisterUser) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUESTS_USER });
      const data = await register(user);
      const { response } = data;
      console.log(response.data.payload);
      AuthUserToken(response.data.payload, dispatch);
    } catch (e) {
      toast.error("Some problems!!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "Unknown error",
      });
    }
  };
};

export const LoginUser = (user: any) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUESTS_USER });
      const data = await login(user);
      const { response } = data;
      console.log(response.data);
      AuthUserToken(response.data.token, dispatch);
    } catch (e) {
      toast.error("Данні вказано не вірно !!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "LoginUser error",
      });
    }
  };
};
export const AuthUserToken = (token: string, dispatch: Dispatch<UserActions>) => {
  try {
    const user = jwtDecode(token) as IUser;


    setAuthToken(token);
    localStorage.token = token;
    dispatch({
      type: UserActionTypes.SUCCESSFUL_LOGIN_USER,
      payload: {
        email: user.email,
        image: user.image,
        phone: user.phone,
        roles: user.roles,
      } as IUser,
    });
  } catch (e) {
    toast.error("Auth User Token Problems !!!", {
      position: toast.POSITION.TOP_RIGHT,
    });
    dispatch({
      type: UserActionTypes.SERVER_USER_ERROR,
      payload: "AuthUserToken error",
    });
  }
};

export const LogoutUser = () => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.LOGOUT_USER });

    } catch (e) {
      toast.error("Logout User Error !!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "Logout User Error !!!",
      });
    }
  };
};

