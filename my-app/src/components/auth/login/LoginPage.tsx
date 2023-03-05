import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import trees from "../../../assets/trees.jpg";
import { Link } from "react-router-dom";
const LoginPage = () => {
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
              <label>Username</label>
              <input className="border relative bg-gray-100 p-2" type="text" />
            </div>
            <div className="flex flex-col ">
              <label>Password</label>
              <input
                className="border relative bg-gray-100 p-2"
                type="password"
              />
            </div>
            <button className="w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white">
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
