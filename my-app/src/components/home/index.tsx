import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Loader from "../loader";
import "./index.css";

const Home = () => {
  const { GetCategories, SetCategoriForUpdate, RemoveCategory } = useActions();
  const { categories, loading, message } = useTypedSelector(
    (store) => store.CategoryReducer
  );

  useEffect(() => {
    GetCategories();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const DeleteCategoryHandler = (id: number) => {
    console.log("Id product: " + id);
    if (
      window.confirm("Are you sure you want to delet category with id: " + id)
    ) {
      RemoveCategory(id);
      //yes
    } else {
      // no
    }
  };

  const table_body = categories?.map((product) => (
    <tr
      key={product.id}
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600
      border border-black ..."
    >
      <td className="w-4 p-4">
        <div className="flex items-center">
          {product.image == null ? (
            <svg
              className="h-full w-full text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <img
              className="w-25 h-20 rounded-full"
              style={{ maxWidth: "75px", minWidth: "75px" }}
              src={
                "http://localhost:8081/api/categories/files/600_" +
                product.image
              }
              alt="Jese image"
            />
          )}

          <div className="pl-3">
            <div className="text-base font-semibold text-2xl font-bold text-gray-900 dark:text-white">
              {product.name}
            </div>
          </div>
        </div>
      </td>

      <td className="px-6 py-4 text-2xl font-bold text-gray-900 dark:text-white">
        <textarea
          disabled
          rows={4}
          // style={{ resize: "none", overflow: "hidden" }}
          // style={{ width: "100%", color: "black" }}
          // value={product.description}
          defaultValue={product.description}
          className="scroll block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ></textarea>
      </td>

      <td className="px-6 py-4">
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <Link
            to={"updateCategory/" + product.id}
            type="button"
            style={{ background: "green" }}
            className="rounded bg-success px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)]"
          >
            Редагувати
          </Link>
          <button
            onClick={() => DeleteCategoryHandler(product.id)}
            type="button"
            style={{ background: "red" }}
            className=" rounded bg-success px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)]"
          >
            Видалити
          </button>
          <Link
            to={"category/products/" + product.id}
            type="button"
            style={{ background: "blueviolet" }}
            className="rounded bg-success px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)]"
          >
            Товари
          </Link>
        </div>
      </td>
    </tr>
  ));

  return (
    <>
      <div className="container mx-auto">
        <div
          className="py-8"
          style={{ display: "flex", justifyContent: "end" }}
        >
          <div className="button-new-category">
            <Link
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
              to="categories/create"
            >
              Add new category
            </Link>
          </div>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="border-b bg-gray-800">
              <tr>
                <th
                  className="px-6 py-3 w-40 ... px-4 py-2 text-sm font-medium text-white"
                  style={{ textAlign: "center" }}
                >
                  Імя Категорії
                </th>
                <th className="px-6 py-3 px-4 py-2 text-sm font-medium text-white">
                  Опис
                </th>
                <th
                  className="px-6 py-3 px-4 py-2 text-sm font-medium text-white"
                  style={{ textAlign: "center" }}
                >
                  Дії
                </th>
              </tr>
            </thead>
            <tbody>{table_body}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
