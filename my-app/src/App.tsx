import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home";
import DefaultLayout from "./components/containers/default";
import LoginPage from "./components/auth/login";
import NotFoundPage from "./components/notFound";
import RegisterPage from "./components/auth/register";
import EditCategory from "./components/categoriesPages/Edit";
import CategoryCreatePage from "./components/categoriesPages/Create";
import { ToastContainer } from "react-toastify";
import HomeProducts from "./components/productsPages/home";
import ProductCreatePage from "./components/productsPages/Create";
import ProductEditPage from "./components/productsPages/Edit";
import InfoProdut from "./components/productsPages/Info";
import AdminLayout from "./components/containers/admin";
import AdminCategoryCreatePage from "./components/admin/categories/Create";
import AdminProductCreatePage from "./components/admin/products/Create";
import AdminCategoryEditPage from "./components/admin/categories/Edit";
import UserProfile from "./components/auth/profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="updateCategory/:id" element={<EditCategory />} />
          <Route path="category/products/:id" element={<HomeProducts />} />
          <Route
            path="category/products/info/:idCategory/:idProduct"
            element={<InfoProdut />}
          />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Home />} />

          <Route
            path="categories/create"
            element={<AdminCategoryCreatePage />}
          />
          <Route
            path="category/products/update/:idCategory/:idProduct"
            element={<AdminCategoryEditPage />}
          />

          <Route path="product/create" element={<AdminProductCreatePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
