import React from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import trees from "../../../assets/trees.jpg";
const RegisterPage = () => {
  return (
    <>
      <div className="relative w-full h-screen bg-zinc-900/90">
        <img
          className="absolute w-full h-full object-cover mix-blend-overlay"
          src={trees}
          alt="/"
        />

        <div className="flex justify-center py-12">
          <form className="max-w-[400px] w-full mx-auto bg-white p-8">
            <h2 className="text-4xl font-bold text-center py-4">Регестрація</h2>

            <div className="flex flex-col mb-4">
              <label>Імя</label>
              <input className="border relative bg-gray-100 p-2" type="text" />
            </div>
            <div className="flex flex-col ">
              <label>Пароль</label>
              <input
                className="border relative bg-gray-100 p-2"
                type="password"
              />
            </div>
            <div className="flex flex-col ">
              <label>Повторіть пароль</label>
              <input
                className="border relative bg-gray-100 p-2"
                type="password"
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
