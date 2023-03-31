import React, { ChangeEvent, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import trees from "../../../assets/trees.jpg";
import { IRegisterUser } from "../types";
const RegisterPage = () => {
  const [model, setModel] = useState<IRegisterUser>({
    name: "",
    email: "",
    password: "",
    image: null,
    phone: "",
    surname: "",
    reCaptchaToken: "",
  });
  const onFileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //console.log("files", e.target.files);
    const { target } = e;
    if (target.files) {
      const file = target.files[0];
      setModel({ ...model, image: file });
    }
  };

  return (
    <>
      <div className=" w-full h-screen bg-zinc-900/90">
        <img
          className="absolute w-full h-full object-cover mix-blend-overlay"
          src={trees}
          alt="/"
        />

        <div className="flex justify-center py-12 ">
          <form className="max-w-[400px] w-full mx-auto bg-white p-8">
            <h2 className="text-4xl font-bold text-center py-4">Регестрація</h2>

            <div className="flex flex-col mb-4 ">
              <div className="flex flex-col ">
                <label className="block text-sm font-medium text-gray-700">
                  Фото
                </label>

                <div className="mt-1 flex items-center flex justify-center ...">
                  <label
                    className="inline-block w-20 overflow-hidden bg-gray-100"
                    htmlFor="selectImage"
                  >
                    <svg
                      className="h-full w-full text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
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
                  className="border relative bg-gray-100 p-2"
                  type="text"
                  id="name"
                  name="name"
                />
              </div>
            </div>
            <div className="flex flex-col ">
              <label>Пароль</label>
              <input
                className="border relative bg-gray-100 p-2"
                type="password"
                id="password"
                name="password"
                autoComplete="true"
              />
            </div>
            <div className="flex flex-col ">
              <label>Повторіть пароль</label>
              <input
                autoComplete="true"
                className="border relative bg-gray-100 p-2"
                type="password"
                id="passwordRepet"
                name="passwordRepet"
              />
            </div>
            <button className="w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white">
              Зареєструватися
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
