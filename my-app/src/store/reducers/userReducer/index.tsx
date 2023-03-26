import { UserActions, UserActionTypes, UserState } from "./types";

const initialState: UserState = {
  user: null,
  message: null,
  loading: false,
  isAuth: false,
};
const UserReducer = (state = initialState, action: UserActions): UserState => {
  switch (action.type) {
    case UserActionTypes.START_REQUEST: {
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
    case UserActionTypes.SUCCESSFUL_REQUEST_REGISTER_USER: {
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        user: action.payload.payload,
        isAuth: true,
      };
    }
    default: {
      return state;
    }
  }
};
export default UserReducer;
