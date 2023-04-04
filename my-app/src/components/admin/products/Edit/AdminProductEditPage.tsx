import { ChangeEvent, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import Loader from "../../../loader";
import "react-toastify/dist/ReactToastify.css";
import { Field, Formik } from "formik";
import { CreateProductSchema } from "../validate";
import { IEditItemPostProduct, IEditItemProduct, IItemProduct } from "../types";
import { FaTrash } from "react-icons/fa";
const ProductEditPage = () => {
  const { GetByIdProduct, RemoveImageFileProduct, UpdateProduct } =
    useActions();
  const { loading, productForUpdate, message } = useTypedSelector(
    (store) => store.ProductsReducer
  );
  const [updateModel, setUpdateModel] = useState<IEditItemProduct>({
    id: 0,
    name: "",
    category_id: "",
    price: 0,
    description: "",
    files: [],
    newFile: [],
  });

  const { idProduct, idCategory } = useParams();
  useEffect(() => {
    GetByIdProduct(parseInt(idProduct!));
  }, []);
  if (loading) {
    return <Loader />;
  }
  if (message == "Successful request update product") {
    return <Navigate to={"/category/products/" + idCategory} />;
  }
  const onFileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    if (target.files) {
      const file = target.files[0];

      setUpdateModel({
        ...updateModel,
        newFile: [file, ...updateModel.newFile],
      });
    }
  };
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const EditProduct: IEditItemPostProduct = {
      name: data.get("name")?.toString()!,
      category_id: idCategory?.toString()!,
      price: Number(data.get("price")),
      description: data.get("description")?.toString()!,
      removeFiles: updateModel.files,
      files: updateModel.newFile,
    };
    console.log(EditProduct);
    UpdateProduct(productForUpdate.id, EditProduct);
  };

  const DeleteProductOldImagesHandler = (imageSrc: String) => {
    setUpdateModel({
      ...updateModel,
      files: [imageSrc, ...updateModel.files],
    });
    RemoveImageFileProduct(imageSrc);
  };

  const DeleteProductNewImagesHandler = (imageSrc: File) => {
    setUpdateModel({
      ...updateModel,
      newFile: updateModel.newFile.filter((item) => item != imageSrc),
    });
  };

  const DataProducts = updateModel.newFile.map((product, index) => (
    <div key={index} className="inline  m-2 ">
      <div
        className="flex justify-center ... border-2 border-black  rounded-lg ... "
        onClick={(e) => {
          DeleteProductNewImagesHandler(product);
        }}
      >
        <FaTrash
          style={{ cursor: "pointer" }}
          className="m-2 "
          onClick={(e) => {
            console.log("Product image : ", product);
          }}
        />
      </div>
      <div className="p-2">
        <img
          key={index}
          className=" w-20 h-20  "
          src={URL.createObjectURL(product)}
        />
      </div>
    </div>
  ));
  const DataProductsOld = productForUpdate.files.map((product, index) => (
    <div key={index} className="inline  m-2 ">
      <div
        style={{ cursor: "pointer" }}
        className="flex justify-center ... border-2 border-black  rounded-lg ... "
        onClick={(e) => {
          DeleteProductOldImagesHandler(product);
        }}
      >
        <FaTrash className="m-2 " />
      </div>
      <div className="p-2">
        <img
          className=" w-20 h-20 "
          src={"http://localhost:8081/api/products/files/1200_" + product}
        ></img>
      </div>
    </div>
  ));

  return (
    <>
      <ToastContainer draggable={false} autoClose={3000} />
      <Formik
        initialValues={{
          name: productForUpdate?.name,
          category_id: "",
          price: productForUpdate?.price,
          description: productForUpdate?.description,
          files: [],
        }}
        validationSchema={CreateProductSchema}
        onSubmit={(e) => {}}
      >
        {({ errors, touched, isValid, dirty }) => (
          <form onSubmit={onSubmitHandler}>
            <div className="container mx-auto">
              <div className="p-8 rounded border border-gray-200">
                <h1 className="font-medium text-3xl">Редагувати</h1>
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
                      <label className="flex ">
                        {productForUpdate.files[0] == null &&
                        DataProducts[0] == null ? (
                          <svg
                            className="w-20 h-20  text-gray-300 "
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        ) : (
                          <>
                            {DataProducts}
                            {DataProductsOld}
                          </>
                        )}
                      </label>
                    </div>

                    <input
                      type="file"
                      id="selectImage"
                      onChange={onFileChangeHandler}
                      className="hidden"
                    />
                  </div>
                </div>
                <div className="space-x-4 mt-8">
                  <button
                    type="submit"
                    className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
                    disabled={!isValid}
                  >
                    Зберегти
                  </button>
                  <Link
                    to={"/category/products/" + idCategory}
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

export default ProductEditPage;
