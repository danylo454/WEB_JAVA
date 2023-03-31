import * as yup from "yup";
export const loginSchema = yup.object({
  email: yup.string().required("Поле не повинне бути пустим"),
  password: yup.string().required("Поле не повинне бути пустим"),
});
