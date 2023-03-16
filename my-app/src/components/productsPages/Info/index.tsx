import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Loader from "../../loader";
import http from "../../../services/http_common";
import { IItemProduct } from "../types";
import { Dispatch } from "react";
import {
  ProductActionTypes,
  ProductsActions,
} from "../../../store/reducers/productReducer/types";
const InfoProdut = () => {
  const { GetByIdProduct, StartReques } = useActions();
  const { loading, message, productForUpdate } = useTypedSelector(
    (store) => store.ProductsReducer
  );
  const { idProduct, idCategory } = useParams();
  const [product, setProduct] = useState<IItemProduct>();

  useEffect(() => {
    http.get(`/api/products/getProduct/` + idProduct).then((resp) => {
      const { data } = resp;
      setProduct(data.payload);
    });

    GetByIdProduct(parseInt(idProduct!));
  }, []);
  if (loading) {
    return <Loader />;
  }
  const ClickLeft = () => {};
  const ClickRight = () => {};
  return (
    <>
      <ToastContainer draggable={false} autoClose={3000} />
      <div className="container mx-auto">
        <form>
          <div className="container mx-auto">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="border-b bg-gray-800">
                  <tr>
                    <th
                      className="px-6 py-3 w-40 ... px-4 py-2 text-sm font-medium text-white"
                      style={{ textAlign: "center" }}
                    >
                      Інфо
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="h-full">
              <div className="border-b-2 block md:flex">
                <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
                  <div className="w-full p-8 mx-2 flex justify-center items-center">
                    <AiOutlineArrowLeft style={{ fontSize: "30px" }} />
                    {product?.files[0] != null ? (
                      <img
                        style={{ maxHeight: "280px", cursor: "pointer" }}
                        className="max-w-xs w-30 items-center border mr-4 ml-4"
                        alt="Products"
                        src={
                          "http://localhost:8081/api/products/files/1200_" +
                          product?.files[0]
                        }
                      ></img>
                    ) : null}

                    <AiOutlineArrowRight
                      style={{ fontSize: "30px", cursor: "pointer" }}
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

                      <input
                        disabled
                        required
                        id="name"
                        defaultValue={productForUpdate.name}
                        name="name"
                        className="border-1  rounded-r px-4 py-2 w-full border-2 border-black-600 ..."
                        type="text"
                      />
                    </div>
                    <div className="pb-6 ">
                      <label
                        htmlFor="about"
                        className="font-semibold text-gray-700 block pb-1"
                      >
                        Опис
                      </label>
                      <textarea
                        defaultValue={productForUpdate.description}
                        disabled
                        id="description"
                        name="description"
                        className="border-1  rounded-r px-4 py-2 w-full border-2 border-black-600 ..."
                      />
                    </div>
                    <div className="pb-6">
                      <label
                        htmlFor="price"
                        className="font-semibold text-gray-700 block pb-1"
                      >
                        Ціна
                      </label>

                      <input
                        disabled
                        required
                        id="price"
                        defaultValue={productForUpdate.price}
                        name="price"
                        className="border-1  rounded-r px-4 py-2 w-full border-2 border-black-600 ..."
                      />
                    </div>
                    <div className="pb-6">
                      <label
                        htmlFor="price"
                        className="font-semibold text-gray-700 block pb-1"
                      >
                        Категорія продукту
                      </label>

                      <input
                        disabled
                        required
                        id="price"
                        defaultValue={productForUpdate.category}
                        name="price"
                        className="border-1  rounded-r px-4 py-2 w-full border-2 border-black-600 ..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default InfoProdut;
