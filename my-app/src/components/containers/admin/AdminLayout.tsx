import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import AdminHeader from "./AdminHeader";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

const AdminLayout = () => {
  const navigate = useNavigate();

  const { isAuth, user } = useTypedSelector((store) => store.UserReducer);

  let isAdmin = false;
  if (isAuth && user) {
    for (let i = 0; i < user?.roles.length; i++)
      if (user?.roles[i] === "admin") isAdmin = true;
  }
  useEffect(() => {
    if (!isAdmin) navigate("/login");
  }, []);

  return (
    <>
      <AdminHeader />
      <div>{isAdmin && <Outlet />}</div>
    </>
  );
};

export default AdminLayout;
