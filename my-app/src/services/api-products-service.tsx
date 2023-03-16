import {
  IEditItemPostProduct,
  IProduct,
} from "../components/productsPages/types";
import http from "./http_common";

export async function getProductsCategories(idCategory: number) {
  const data = await http
    .get("/api/products/" + idCategory)
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
export async function createProduct(model: IProduct) {
  const data = await http
    .post("/api/products", model, {
      headers: { "Content-Type": "multipart/form-data" },
    })
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
export async function getByIdProduct(id: number) {
  const data = await http
    .get("/api/products/getProduct/" + id)
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
export async function updateProduct(id: number, model: IEditItemPostProduct) {
  const data = await http
    .put("/api/products/updateProduct/" + id, model, {
      headers: { "Content-Type": "multipart/form-data" },
    })
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
export async function removeProduct(id: number) {
  const data = await http
    .delete("/api/products/" + id)
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
