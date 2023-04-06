import { ToastContainer } from "react-toastify";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

const UserProfile = () => {
  const { user } = useTypedSelector((store) => store.UserReducer);
  return (
    <>
      {" "}
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
                    {user?.image != null && user.image != "" ? (
                      <>
                        <img
                          style={{ minHeight: "280px", cursor: "pointer" }}
                          className="max-w-xs w-30 items-center border mr-4 ml-4"
                          alt="Products"
                          src={
                            "http://localhost:8081/api/products/files/1200_" +
                            user.image
                          }
                        ></img>
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
                        Email
                      </label>

                      <input
                        disabled
                        required
                        id="email"
                        defaultValue={user?.email}
                        name="email"
                        className="border-1  rounded-r px-4 py-2 w-full border-2 border-black-600 ..."
                        type="email"
                      />
                    </div>
                    <div className="pb-6">
                      <label
                        htmlFor="price"
                        className="font-semibold text-gray-700 block pb-1"
                      >
                        Телефон
                      </label>

                      <input
                        disabled
                        required
                        id="phone"
                        defaultValue={user?.phone}
                        name="phone"
                        className="border-1  rounded-r px-4 py-2 w-full border-2 border-black-600 ..."
                      />
                    </div>
                    {/* <div className="pb-6">
                      <label
                        htmlFor="phone"
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
                    </div> */}
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
export default UserProfile;
