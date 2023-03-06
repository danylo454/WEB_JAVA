import {
  ICategoryCreate,
  ICategoryUpdate,
} from "../components/categoriesPajes/types";
import http from "../services/http_common";

export async function getCategories() {
  const data = await http
    .get("/api/categories/")
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

export async function getCategoriesById(idCategory: number) {
  const data = await http
    .get("/api/categories/" + idCategory)
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

export async function createCategory(model: ICategoryCreate) {
  const data = await http
    .post("/api/categories/addCategory", model, {
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
export async function removeCategory(id: number) {
  const data = await http
    .delete("/api/categories/" + id)
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
export async function updateCategory(model: ICategoryUpdate) {
  const data = await http
    .put("/api/categories/updateCategory", model)
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
