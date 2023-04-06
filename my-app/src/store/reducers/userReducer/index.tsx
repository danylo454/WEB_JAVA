import { IUser } from "../../actions/userActions/types";
import { UserActions, UserActionTypes, UserState } from "./types";

const initialState: UserState = {
  user: null,
  message: null,
  loading: false,
  isAuth: false,
};
const UserReducer = (state = initialState, action: UserActions): UserState => {
  switch (action.type) {
    case UserActionTypes.SUCCESSFUL_REQUEST_LOGIN_USER: {
      return {
        ...state,
        loading: false,
        isAuth: true,
        user: action.payload.payload,
      };
    }
    case UserActionTypes.START_REQUESTS_USER: {
      return {
        ...state,
        loading: true,
      };
    }
    case UserActionTypes.SERVER_USER_ERROR: {
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    }
    case UserActionTypes.SUCCESSFUL_LOGIN_USER: {
      const user: IUser = action.payload as IUser;
      return {
        ...state,
        isAuth: true,
        user: user,
        loading: false,
        message: "Successful login user",
      };
    }
    case UserActionTypes.SUCCESSFUL_REQUEST_REGISTER_USER: {
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        user: action.payload.payload,
        isAuth: true,
      };
    }
    case UserActionTypes.LOGOUT_USER: {
      return {
        ...state,
        loading: false,
        message: "Logout user successful",
        user: null,
        isAuth: false,
      };
    }
    default: {
      return state;
    }
  }
};
export default UserReducer;
