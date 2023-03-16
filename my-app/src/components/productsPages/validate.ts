import * as Yup from "yup";
export const CreateProductSchema = Yup.object().shape({
  name: Yup.string()
    .required("Обовязково назва !")
    .min(2, "За маленька назва !")
    .max(60, "За велика назва !"),

  description: Yup.string()
    .min(2, "За маленький опис !")
    .max(6000, "За великий опис !")
    .required("Обовязково потрібний опис !"),
  price: Yup.number()
    .min(1, "За маленька ціна")
    .required("Обовязково потрібна ціна"),
});
