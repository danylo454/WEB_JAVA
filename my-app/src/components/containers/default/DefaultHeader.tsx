import { Fragment, useState } from "react";
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
import { ToastContainer } from "react-toastify";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";
import setAuthToken from "../../../services/setAuthToken";
import { useDispatch } from "react-redux";
import { UserActionTypes } from "../../../store/reducers/userReducer/types";



function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
const DefaultHeader = () => {
  const navigator = useNavigate();
  const { isAuth, user, message } = useTypedSelector((store) => store.UserReducer);
  const { LogoutUser } = useActions();
  let isAdmin = false;
  if (isAuth && user) {
    for (let i = 0; i < user?.roles.length; i++)
      if (user?.roles[i] === "admin") isAdmin = true;
  }
  // if (message == "Logout user successful") {
  //   navigator("/login");
  // }

  const dispatch = useDispatch();


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
        <div className="container mx-auto ">
          <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link to="/">
                <span className="sr-only">Магазин Logo</span>
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
              <Popover className="relative">
                {({ open }) => (
                  <>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 -ml-4 mt-3 w-screen max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                            <Link
                              to="/admin"
                              className="text-base font-medium text-gray-500 hover:text-gray-900"
                            >
                              Адмін панель
                            </Link>

                          </div>

                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>

              <Link
                to="/"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Товари
              </Link>

              {isAdmin && (
                <Link
                  to="/admin"
                  className="text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Адмін панель
                </Link>
              )}

              <Popover className="relative">
                {({ open }) => (
                  <>


                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 transform px-2 sm:px-0">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">


                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
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
                  <button
                    onClick={logoutUser}
                    className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Вихід
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                  >
                    Вхід
                  </Link>
                  <Link
                    to="/register"
                    className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Заререєструватися
                  </Link>
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
              <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt="Your Company"
                    />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-8">
                    <Link
                      to="/"
                      className="text-base font-medium text-gray-500 hover:text-gray-900"
                    >
                      Товари
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="text-base font-medium text-gray-500 hover:text-gray-900"
                      >
                        Адмін панель
                      </Link>
                    )}
                    {isAuth ? (

                      <Link
                        to="/profile"
                        className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                      >
                        {user?.email}
                      </Link>


                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                        >
                          Вхід
                        </Link>

                      </>
                    )}

                  </nav>
                </div>
              </div>
              <div className="space-y-6 py-6 px-5">

                <div>

                  <p className="mt-6 text-center text-base font-medium text-gray-500">
                    {isAuth == true ? (

                      <button

                        onClick={logoutUser}
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      >
                        Вихід
                      </button>
                    ) : (<Link

                      to="/register"
                      className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Заререєструватися
                    </Link>)}

                  </p>

                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
};

export default DefaultHeader;
