import { register } from "../../../services/api-user-service";
import { Dispatch } from "react";
import { UserActions, UserActionTypes } from "../../reducers/userReducer/types";
import { toast } from "react-toastify";
export const RegisterUser = (user: any) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });
      console.log("response Start");
      const data = await register(user);
      const { response } = data;
      console.log("Response : ", response);
      console.log(response);
      dispatch({
        type: UserActionTypes.SUCCESSFUL_REQUEST_REGISTER_USER,
        payload: response.data,
      });
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
