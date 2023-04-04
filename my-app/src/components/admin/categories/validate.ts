import * as Yup from "yup";

export const CreateCategorySchema = Yup.object().shape({
  name: Yup.string()
    .required("Обовязково назва !")
    .min(2, "За маленька назва !")
    .max(60, "За велика назва !"),

  description: Yup.string()
    .min(2, "За маленький опис !")
    .max(6000, "За великий опис !")
    .required("Обовязково потрібний опис !"),
  // image: Yup.mixed().required("Фото обовязково !"),
});

export const UpdateCategorySchema = Yup.object().shape({
  name: Yup.string()
    .required("Обовязково назва !")
    .min(2, "За маленька назва !")
    .max(60, "За велика назва !"),

  description: Yup.string()
    .min(2, "За маленький опис !")
    .max(6000, "За великий опис !")
    .required("Обовязково потрібний опис !"),
  // image: Yup.mixed().required("Фото обовязково !"),
});
