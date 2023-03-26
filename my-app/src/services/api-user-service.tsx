import http from "./http_common";

export async function register(user: any) {
  const data = await http
    .post(`api/Account/register`, user)
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
    .post(`api/Account/login`, user)
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
