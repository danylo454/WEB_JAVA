import { Field, Formik } from "formik";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import Loader from "../../loader";
import { ICategoryUpdate } from "../types";
import { UpdateCategorySchema } from "../validate";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "@tinymce/tinymce-react";
const EditCategory = () => {
  const { GetCategoriesById, UpdateCategory } = useActions();
  const { loading, categoryForUpdate, message } = useTypedSelector(
    (store) => store.CategoryReducer
  );
  const [model, setModel] = useState<String>("");
  const [modelcategoryForUpdate, setModelcategoryForUpdate] = useState(
    categoryForUpdate.image
  );

  const { id } = useParams();

  useEffect(() => {
    GetCategoriesById(parseInt(id!));
  }, []);

  if (loading) {
    return <Loader />;
  }
  if (message == "Category successfully updated !") {
    return <Navigate to="/" />;
  }

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const newCategory: ICategoryUpdate = {
      name: data.get("name")?.toString()!,
      description: data.get("description")?.toString()!,
      newImage: model == "" ? null : model.toString(),
      id: categoryForUpdate.id,
    };
    console.log("Update", newCategory);
    // UpdateCategory(newCategory);
  };
  const onFileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { files } = target;
    if (files) {
      const file = files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (e) => {
        const result = e.target?.result as string;
        setModel(result);
      };
    }
    target.value = "";
    setModelcategoryForUpdate("");
  };

  return (
    <>
      <ToastContainer draggable={false} autoClose={3000} />
      <Formik
        initialValues={{
          name: categoryForUpdate.name,
          description: categoryForUpdate.description,
        }}
        validationSchema={UpdateCategorySchema}
        onSubmit={(e) => {}}
      >
        {({ errors, touched, isSubmitting, isValid, dirty }) => (
          <form onSubmit={onSubmitHandler}>
            <div className="container mx-auto">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="border-b bg-gray-800">
                    <tr>
                      <th
                        className="px-6 py-3 w-40 ... px-4 py-2 text-sm font-medium text-white"
                        style={{ textAlign: "center" }}
                      >
                        Редагування
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div className="h-full">
                <div className="border-b-2 block md:flex">
                  <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
                    <div className="w-full p-8 mx-2 flex justify-center">
                      <label htmlFor="newImage">
                        {categoryForUpdate.image == null ? (
                          <img
                            style={{ maxHeight: "280px" }}
                            className="max-w-xs w-30 items-center border"
                            alt="Category Image"
                            src={
                              model == ""
                                ? "http://localhost:8081/api/categories/files/notFoundImage.jpg"
                                : model.toString()
                            }
                          ></img>
                        ) : (
                          <img
                            style={{ maxHeight: "280px" }}
                            className="max-w-xs w-30 items-center border"
                            src={
                              categoryForUpdate.image != "" && model == ""
                                ? "http://localhost:8081/api/categories/files/600_" +
                                  categoryForUpdate.image
                                : model.toString()
                            }
                            alt="Category Image"
                          />
                        )}
                      </label>
                      <input
                        type="file"
                        id="newImage"
                        onChange={onFileChangeHandler}
                        className="hidden"
                      />
                    </div>
                  </div>

                  <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
                    <div className="rounded  shadow p-6">
                      <div className="pb-6">
                        <label
                          htmlFor="name"
                          className="font-semibold text-gray-700 block pb-1"
                        >
                          Назва
                        </label>

                        <Field
                          required
                          id="name"
                          name="name"
                          className="border-1  rounded-r px-4 py-2 w-full border-2 border-black-600 ..."
                          type="text"
                        />
                        {errors.name && touched.name ? (
                          <div style={{ color: "red" }}>{errors.name}</div>
                        ) : null}
                      </div>
                      <div className="pb-6 ">
                        <label
                          htmlFor="about"
                          className="font-semibold text-gray-700 block pb-1"
                        >
                          Опис
                        </label>
                        <Field
                          as="textarea"
                          id="description"
                          name="description"
                          className="border-1  rounded-r px-4 py-2 w-full border-2 border-black-600 ..."
                          type="text"
                        />

                        {errors.description && touched.description ? (
                          <div style={{ color: "red" }}>
                            {errors.description}
                          </div>
                        ) : null}
                      </div>
                      <div
                        className="py-8"
                        style={{ display: "flex", justifyContent: "end" }}
                      >
                        <button
                          type="submit"
                          disabled={!isValid}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                        >
                          Зберегти
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};
export default EditCategory;
