import { Field, Formik, useFormik } from "formik";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { ICategoryItem, IProduct } from "../types";
import { CreateProductSchema } from "../validate";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useActions } from "../../../../hooks/useActions";
import Loader from "../../../loader";
import http from "../../../../services/http_common";
import { APP_ENV } from "../../../../env";

const ProductCreatePage = () => {
  const { CreateProduct } = useActions();
  const { id } = useParams();
  const { loading, message } = useTypedSelector(
    (store) => store.ProductsReducer
  );
  const [model, setModel] = useState<IProduct>({
    name: "",
    category_id: "",
    price: 0,
    description: "",
    files: [],
  });
  // if (loading) {
  //   return <Loader />;
  // }
  const [categories, setCategories] = useState<Array<ICategoryItem>>([]);
  useEffect(() => {
    console.log(`${APP_ENV.REMOTE_HOST_NAME}api/categories`);
    http
      .get<Array<ICategoryItem>>(`${APP_ENV.REMOTE_HOST_NAME}api/categories`)
      .then((resp) => {
        console.log("resp = ", resp);

        setCategories(resp.data);
      });
  }, []);

  if (message == "Successful request create product") {
    return <Navigate to={"/category/products/" + id} />;
  }

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    console.log("input", e.target);
    setModel({ ...model, [e.target.name]: e.target.value });
  };

  const onFileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //console.log("files", e.target.files);
    const { target } = e;
    if (target.files) {
      const file = target.files[0];
      setModel({ ...model, files: [...model.files, file] });
    }
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const newCategory: IProduct = {
      name: data.get("name")?.toString()!,
      category_id: id?.toString()!,
      price: Number(data.get("price")),
      description: data.get("description")?.toString()!,
      files: model.files,
    };
    CreateProduct(newCategory);
    console.log(newCategory);
  };
  const content = categories.map((category) => (
    <option key={category.id} value={category.id}>
      {category.name}
    </option>
  ));

  const filesContent = model.files.map((f, index) =>
    f == null ? null : (
      <img key={index} className="m-1 " src={URL.createObjectURL(f)} />
    )
  );
  return (
    <>
      <ToastContainer draggable={false} autoClose={3000} />
      <Formik
        initialValues={{
          name: "",
          category_id: "",
          price: 0,
          description: "",
          files: [],
        }}
        validationSchema={CreateProductSchema}
        onSubmit={(e) => {}}
      >
        {({ errors, touched, isValid, dirty }) => (
          <form onSubmit={onSubmitHandler}>
            <div className="container mx-auto">
              <div className="p-8 rounded border border-gray-200">
                <h1 className="font-medium text-3xl">Додати Новий продукт</h1>
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
                      id="name"
                      name="name"
                      className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full form-control"
                      placeholder="Вкажіть назву продукту"
                    />
                    {errors.name && touched.name ? (
                      <div style={{ color: "red" }}>{errors.name}</div>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor="name"
                      className="text-sm text-gray-700 block mb-1 font-medium"
                    >
                      Ціна
                    </label>

                    <Field
                      as="input"
                      type="number"
                      name="price"
                      id="price"
                      className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                      placeholder="Вкажіть ціну продукту"
                    />
                    {errors.price && touched.price ? (
                      <div style={{ color: "red" }}>{errors.price}</div>
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
                      htmlFor="description"
                      as="textarea"
                      id="description"
                      name="description"
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
                        className="mb-2 flex rounded-md border border-gray-300 bg-white 
                        py-2 px-3 text-sm font-medium leading-4 text-gray-700 
                        shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 
                        focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Додати фото
                      </label>
                    </div>

                    <div className="mt-1 flex items-center">
                      <label
                        htmlFor="selectImage"
                        className="flex w-20  bg-gray-100"
                      >
                        {model.files.length == 0 ? (
                          <svg
                            className="h-full w-full text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        ) : (
                          filesContent
                        )}
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
                    to={"/category/products/" + id}
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

export default ProductCreatePage;
