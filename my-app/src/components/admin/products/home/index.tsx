import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useActions } from "../../../../hooks/useActions";
import Loader from "../../../loader";
import ModalDelete from "../../../modal/delete";

const HomeProducts = () => {
  const { GetProductsCategories, RemoveProduct } = useActions();
  const { products, loading } = useTypedSelector(
    (store) => store.ProductsReducer
  );
  const { id } = useParams();
  useEffect(() => {
    GetProductsCategories(parseInt(id!));
  }, []);
  if (loading) {
    return <Loader />;
  }
  const DeleteProductHandler = (id: number) => {
    RemoveProduct(id);
  };

  const DataProducts = products.map((product) => (
    <div
      key={product.id}
      className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
    >
      <article className="overflow-hidden rounded-lg shadow-lg  border-2 border-black  rounded-lg .. ">
        <div className="rounded-lg ... ">
          {product.files[0] == null ? (
            <svg
              className="block h-80 ... w-full p-10 rounded-lg ...   text-gray-300 "
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <img
              alt="Placeholder"
              className="block h-80 ... w-full p-10 rounded-lg ...  "
              src={
                "http://localhost:8081/api/products/files/1200_" +
                product.files[0]
              }
            />
          )}
        </div>

        <header className="flex items-center justify-between leading-tight p-2 md:p-4">
          <h1 className="text-lg">
            <div className="no-underline hover:underline text-black">
              {product.name}
            </div>
          </h1>
        </header>

        <footer
          className="flex items-center justify-between leading-none p-2 md:p-4"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div className=" flex items-center no-underline hover:underline text-black">
            <Link
              to={"/category/products/info/" + id + "/" + product.id}
              type="button"
              className="ml-2 text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Відкрити
            </Link>
            <Link
              to={"/category/products/update/" + id + "/" + product.id}
              type="button"
              className="ml-2 text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Редагувати
            </Link>
            <ModalDelete
              id={product.id}
              deleteFunc={DeleteProductHandler}
              title="Видалення товара"
              text={`Ви дійсно бажаєте видалити товар '${product.name}'?`}
            />
            {/* <button
              onClick={() => DeleteProductHandler(product.id)}
              type="button"
              className="ml-2 text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Видалити
            </button> */}
          </div>
        </footer>
      </article>
    </div>
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
              to={"/product/create/" + id}
            >
              Додати новий продукт
            </Link>
          </div>
        </div>
        <div className="container  mx-auto px-4 md:px-12">
          {products.length == 0 ? (
            <div className="flex justify-center ... ">
              <h1 className="border-2 border-black  rounded-lg p-2 ">
                В цій категорії товари відсутні
              </h1>
            </div>
          ) : (
            <div className="flex flex-wrap -mx-1 lg:-mx-4 ">{DataProducts}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomeProducts;
