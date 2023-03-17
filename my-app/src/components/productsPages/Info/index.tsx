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
import { number } from "yup";
const InfoProdut = () => {
  const { GetByIdProduct, StartReques } = useActions();
  const { message, productForUpdate } = useTypedSelector(
    (store) => store.ProductsReducer
  );
  const { idProduct, idCategory } = useParams();
  const [product, setProduct] = useState<IItemProduct>();
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    http.get(`/api/products/getProduct/` + idProduct).then((resp) => {
      const { data } = resp;
      setProduct(data.payload);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loader />;
  }
  const ClickLeft = () => {
    var temp = count;

    if (temp == 0) {
    } else {
      setCount(--temp);
    }
  };
  const ClickRight = () => {
    var temp = count;

    if (temp + 2 > product?.files.length!) {
    } else {
      setCount(++temp);
    }
  };
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
                <div className="w-full  md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
                  <div className="w-full  p-8 mx-2 flex justify-center items-center">
                    {product?.files[0] != null ? (
                      <>
                        <button type="button">
                          <AiOutlineArrowLeft
                            onClick={ClickLeft}
                            style={{ fontSize: "30px", cursor: "pointer" }}
                          />
                        </button>{" "}
                        <img
                          style={{ minHeight: "280px", cursor: "pointer" }}
                          className="max-w-xs w-30 items-center border mr-4 ml-4"
                          alt="Products"
                          src={
                            "http://localhost:8081/api/products/files/1200_" +
                            product?.files[count]
                          }
                        ></img>{" "}
                        <button type="button">
                          <AiOutlineArrowRight
                            onClick={ClickRight}
                            style={{ fontSize: "30px", cursor: "pointer" }}
                          />
                        </button>
                      </>
                    ) : (
                      <img
                        style={{ minHeight: "280px", cursor: "pointer" }}
                        className="max-w-xs w-30 items-center border mr-4 ml-4"
                        alt="Products"
                        src={
                          "http://localhost:8081/api/products/files/notFoundImage.jpg"
                        }
                      ></img>
                    )}
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
                        defaultValue={product?.name}
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
                        defaultValue={product?.description}
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
                        defaultValue={product?.price}
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
                        defaultValue={product?.category}
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
