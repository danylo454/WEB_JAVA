import * as yup from "yup";
export const loginSchema = yup.object({
  email: yup.string().required("Поле не повинне бути пустим"),
  password: yup.string().required("Поле не повинне бути пустим"),
});
//   \+\d{12}
const phoneRegex = /\d{12}/
export const registerSchema = yup.object({
  email: yup.string().required("Поле не повинне бути пустим"),
  name: yup.string().required("Поле не повинне бути пустим"),
  password: yup.string().required("Поле не повинне бути пустим"),
  phone: yup.string().required("Поле не повинне бути пустим").matches(phoneRegex, "Номер не у валідному форматі"),
  surname: yup.string().required("Поле не повинне бути пустим"),
  confirmPassword: yup.string().required("Поле не повинне бути пустим").min(5, "Пароль повинен містити мініму 5 символів").oneOf([yup.ref("password")], () => "Паролі повинні співпадати")

});
