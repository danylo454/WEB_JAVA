import React, { ChangeEvent, useState } from "react";
import trees from "../../../assets/trees.jpg";
import { IRegisterUser } from "../types";
import Loader from "../../loader";
import { useActions } from "../../../hooks/useActions";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { registerSchema } from "../validation";
import { useFormik } from "formik";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
const RegisterPage = () => {
  const { loading, message, isAuth } = useTypedSelector(
    (store) => store.UserReducer
  );
  const { RegisterUser } = useActions();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [model, setModel] = useState<IRegisterUser>({
    name: "",
    email: "",
    password: "",
    image: null,
    phone: "",
    surname: "",
    reCaptchaToken: "",
    confirmPassword: ""
  });

  const onFileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log("files", e.target.files);
    const { target } = e;
    const { files } = target;
    if (target.files) {
      const file = target.files[0];
      setModel({ ...model, image: file });
      formik.values.image = file;
    }
  };
  const onSubmitFormik = async (values: IRegisterUser) => {
    try {
      if (!executeRecaptcha) return;
      values.reCaptchaToken = await executeRecaptcha();
      console.log(values);
      RegisterUser(values);

    } catch (errors: any) { console.log("Щось пішло не так !!!") }

  };
  const formik = useFormik({
    initialValues: model,
    onSubmit: onSubmitFormik,
    validationSchema: registerSchema,
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
      <div className=" w-full h-screen bg-zinc-900/90">
        <img
          className="absolute w-full h-full object-cover mix-blend-overlay"
          src={trees}
          alt="/"
        />

        <div className="flex justify-center py-12 ">
          <form
            className="max-w-[400px] w-full mx-auto bg-white p-8"
            onSubmit={handleSubmit}
          >
            <h2 className="text-4xl font-bold text-center py-4">Регестрація</h2>

            <div className="flex flex-col mb-4 ">
              <div className="flex flex-col ">
                <label className="block text-sm font-medium text-gray-700">
                  Фото
                </label>
                <div className="mt-1 flex items-center flex justify-center ...">
                  <label
                    className="inline-block w-20 h-20 overflow-hidden bg-gray-100"
                    htmlFor="selectImage"
                    style={{ zIndex: 10000 }}
                  >
                    {model.image == null ? (<svg
                      className="h-full w-full text-gray-300"
                      fill="currentColor"
                      viewBox="0  0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>) : (
                      <img className="h-full w-full text-gray-300"
                        src={URL.createObjectURL(model.image)} />
                    )}
                  </label>
                  <label
                    htmlFor="selectImage"
                    className="ml-5 rounded-md border border-gray-300 bg-white 
                        py-2 px-3 text-sm font-medium leading-4 text-gray-700 
                        shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 
                        focus:ring-indigo-500 focus:ring-offset-2 relative"
                    style={{ zIndex: 1000 }}
                  >
                    Змінити
                  </label>
                </div>
                <input
                  type="file"
                  id="selectImage"
                  onChange={onFileChangeHandler}
                  className="hidden"
                />
              </div>
              <div className="flex flex-col ">
                <label>Імя</label>
                <input
                  placeholder="Імя"
                  className="border relative bg-gray-100 p-2"
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={values.name}
                /> {errors.name && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">{errors.name}</span>
                  </p>
                )}
              </div>
              <div className="flex flex-col ">
                <label>Прізвище</label>
                <input
                  placeholder="Призвіще"
                  className="border relative bg-gray-100 p-2"
                  type="text"
                  id="surname"
                  name="surname"
                  onChange={handleChange}
                  value={values.surname}

                />{errors.surname && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">{errors.surname}</span>
                  </p>
                )}
              </div>
              <div className="flex flex-col ">
                <label>Телефон</label>
                <input
                  className="border relative bg-gray-100 p-2"
                  type="number"
                  placeholder="+380983121411"
                  id="phone"
                  onChange={handleChange}
                  value={values.phone}
                  name="phone"
                /> {errors.phone && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">{errors.phone}</span>
                  </p>
                )}
              </div>
              <div className="flex flex-col ">
                <label>Телефон</label>
                <input
                  className="border relative bg-gray-100 p-2"
                  type="email"
                  placeholder="user@gmail.com"
                  id="email"
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                /> {errors.email && (
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
                  id="password"
                  name="password"
                  // autoComplete="true"
                  onChange={handleChange}
                  value={values.password}
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">{errors.password}</span>
                  </p>
                )}
              </div>
              <div className="flex flex-col ">
                <label>Повторіть пароль</label>
                <input
                  placeholder="Повторіть пароль"
                  // autoComplete="true"
                  className="border relative bg-gray-100 p-2"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={handleChange}
                  value={values.confirmPassword}
                />
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">{errors.confirmPassword}</span>
                  </p>
                )}
              </div>
            </div>

            <button type="submit" className="w-full py-2 mt-2 bg-indigo-600 hover:bg-indigo-500 relative text-white">
              Зареєструватися
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
