import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import trees from "../../../assets/trees.jpg";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { ILoginUser } from "../types";
import { loginSchema } from "../validation";
import { useFormik } from "formik";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Loader from "../../loader";
import { useActions } from "../../../hooks/useActions";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const LoginPage = () => {
  const { LoginUser } = useActions();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const initValues: ILoginUser = {
    email: "",
    password: "",
    reCaptchaToken: "",
  };
  const { loading, message, isAuth } = useTypedSelector(
    (store) => store.UserReducer
  );

  const onSubmitFormik = async (values: ILoginUser) => {
    if (!executeRecaptcha) return;
    values.reCaptchaToken = await executeRecaptcha();
    LoginUser(values);
  };

  const formik = useFormik({
    initialValues: initValues,
    onSubmit: onSubmitFormik,
    validationSchema: loginSchema,
  });
  if (loading) {
    return <Loader />;
  }
  if (message == "Successful login user") {
    return <Navigate to={"/"}></Navigate>
  }
  const { values, errors, touched, handleSubmit, handleChange, setFieldValue } =
    formik;
  return (
    <>
      <ToastContainer draggable={false} autoClose={3000} />
      <div className="relative w-full h-screen bg-zinc-900/90">
        <img
          className="absolute w-full h-full object-cover mix-blend-overlay"
          src={trees}
          alt="/"
        />

        <div className="flex justify-center py-12">
          <form
            className="max-w-[400px] w-full mx-auto bg-white p-8"
            onSubmit={handleSubmit}
          >
            <h2 className="text-4xl font-bold text-center py-4">
              Вхід на сайт.
            </h2>
            <div className="flex justify-between py-8">
              <p className="border shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center">
                <AiFillFacebook className="mr-2" /> Facebook
              </p>
              <p className="border shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center">
                <FcGoogle className="mr-2" /> Google
              </p>
            </div>
            <div className="flex flex-col mb-4">
              <label>Емейл</label>
              <input
                className="border relative bg-gray-100 p-2"
                type="text"
                name="email"
                id="email"
                onChange={handleChange}
                value={values.email}
                placeholder="Email"
              />{" "}
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">{errors.email}</span>
                </p>
              )}
            </div>
            <div className="flex flex-col ">
              <label>Пароль</label>
              <input
                placeholder="Пароль"
                className="border relative bg-gray-100 p-2"
                type="password"
                name="password"
                id="password"
                autoComplete="true"
                onChange={handleChange}
                value={values.password}
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">{errors.password}</span>
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white"
            >
              Увійти
            </button>
            <div className="my-4">
              <Link
                to="/register"
                className="mb-4 text-indigo-600 hover:text-indigo-500 relative"
              >
                Не зареєстрований? Зареєструватися зараз
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
