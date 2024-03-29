import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  BookmarkSquareIcon,
  CalendarIcon,
  ChartBarIcon,
  CursorArrowRaysIcon,
  LifebuoyIcon,
  PhoneIcon,
  PlayIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import setAuthToken from "../../../services/setAuthToken";
import { UserActionTypes } from "../../../store/reducers/userReducer/types";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
const AdminHeader = () => {
  const { isAuth, user } = useTypedSelector((store) => store.UserReducer);
  const LogoutUser = (e: any) => {
    e.preventDefault();
    localStorage.removeItem("token");
  };
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const logoutUser = (e: any) => {
    e.preventDefault();
    // LogoutUser();
    setAuthToken("");
    localStorage.removeItem("token");
    dispatch({
      type: UserActionTypes.LOGOUT_USER,
    });
    navigator("/login");


  };
  return (
    <>
      <Popover className="relative bg-white" style={{ zIndex: 100 }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link to="/">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto sm:h-10"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </Link>
            </div>
            <div className="-my-2 -mr-2 md:hidden">
              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <Popover.Group as="nav" className="hidden space-x-10 md:flex">
              <Link
                to="/"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Товари
              </Link>

              <Link
                to="/admin/categories/create"
                className="text-base font-medium text-gray-500 hover:text-gray-900 "
              >
                Додати Категорію
              </Link>

              <Link
                to="/admin/product/create"
                className="text-base font-medium text-gray-500 hover:text-gray-900 "
              >
                Додати Продукт
              </Link>
            </Popover.Group>

            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              {isAuth ? (
                <>
                  <Link
                    to="/profile"
                    className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                  >
                    {user?.email}
                  </Link>
                  <Link
                    to="#"
                    onClick={LogoutUser}
                    className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Вихід
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                  >
                    Вхід
                  </Link>
                  <a
                    href="#"
                    className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Sign up
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
          >
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="space-y-6 py-6 px-5">
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  <Link
                    to="/admin/categories/create"
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    Додати Категорію
                  </Link>
                  <Link
                    to="/admin/product/create"
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    Додати Продукт
                  </Link>
                  <Link
                    to={"/"}
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    Товари
                  </Link>
                </div>
                <div>
                  <button
                    onClick={logoutUser}
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Вихід
                  </button>

                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
};

export default AdminHeader;
