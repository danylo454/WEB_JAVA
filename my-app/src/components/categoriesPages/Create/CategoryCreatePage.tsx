import axios, { Axios } from "axios";
import { ChangeEvent, ReactElement, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ICategoryCreate } from "../types";
import { Field, Formik } from "formik";
import { CreateCategorySchema } from "../validate";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../loader";

const CategoryCreatePage = () => {
  const navigator = useNavigate();
  const { GetCategories, SetCategoriForUpdate, CreateCategory } = useActions();
  const { categories, loading, message } = useTypedSelector(
    (store) => store.CategoryReducer
  );
  const [model, setModel] = useState<ICategoryCreate>({
    name: "",
    description: "",
    file: null,
  });
  const onFileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { files } = target;
    if (files) {
      const file = files[0];
      setModel({ ...model, file });
    }
    target.value = "";
  };
  if (loading) {
    return <Loader />;
  }
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const newCategory: ICategoryCreate = {
      name: data.get("name")?.toString()!,
      description: data.get("description")?.toString()!,
      file: model.file,
    };
    console.log(newCategory);
    CreateCategory(newCategory);
  };
  if (message == "Successful request") {
    return <Navigate to="/" />;
  }
  return (
    <>
      <ToastContainer draggable={false} autoClose={3000} />
      <Formik
        initialValues={model}
        validationSchema={CreateCategorySchema}
        onSubmit={(e) => {
          // console.log(e);
        }}
      >
        {({ errors, touched, isSubmitting, isValid, dirty }) => (
          <form onSubmit={onSubmitHandler}>
            <div className="container mx-auto">
              <div className="p-8 rounded border border-gray-200">
                <h1 className="font-medium text-3xl">Додати категорію</h1>
                <div className="mt-8 grid lg:grid-cols-1 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-sm text-gray-700 block mb-1 font-medium"
                    >
                      Назва
                    </label>

                    <Field
                      type="text"
                      name="name"
                      required
                      id="name"
                      className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                      placeholder="Вкажіть назву категорії"
                    />

                    {errors.name && touched.name ? (
                      <div style={{ color: "red" }}>{errors.name}</div>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                    >
                      Опис
                    </label>

                    <Field
                      as="textarea"
                      type="textarea"
                      multiple={true}
                      id="description"
                      name="description"
                      required
                      rows={4}
                      cols={5}
                      className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                      placeholder="Вкажіть опис..."
                    ></Field>
                    {errors.description && touched.description ? (
                      <div style={{ color: "red" }}>{errors.description}</div>
                    ) : null}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Фото
                    </label>

                    <div className="mt-1 flex items-center">
                      <label
                        htmlFor="selectImage"
                        className="inline-block w-20 overflow-hidden bg-gray-100"
                      >
                        {model.file === null ? (
                          <svg
                            className="h-full w-full text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        ) : (
                          <img src={URL.createObjectURL(model.file)} />
                        )}
                      </label>
                      <label
                        htmlFor="selectImage"
                        className="ml-5 rounded-md border border-gray-300 bg-white 
                        py-2 px-3 text-sm font-medium leading-4 text-gray-700 
                        shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 
                        focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Змінити
                      </label>
                    </div>

                    <input
                      type="file"
                      onChange={onFileChangeHandler}
                      id="selectImage"
                      className="hidden"
                    />
                  </div>
                </div>
                <div className="space-x-4 mt-8">
                  <button
                    type="submit"
                    className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
                    disabled={!(isValid && dirty)}
                  >
                    Зберегти
                  </button>
                  <Link
                    to="/"
                    className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
                  >
                    Назад
                  </Link>{" "}
                </div>{" "}
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default CategoryCreatePage;
