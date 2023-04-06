import { IRegisterUser } from "../components/auth/types";
import http from "./http_common";

export async function register(user: IRegisterUser) {
  const data = await http
    .post(`/account/register`, user)
    .then((response) => {
      return {
        response,
      };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}
export async function login(user: any) {
  const data = await http
    .post(`account/login`, user)
    .then((response) => {
      return {
        response,
      };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}
