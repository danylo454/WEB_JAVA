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
          <Route path="categories/create" element={<CategoryCreatePage />} />
          <Route path="product/create/:id" element={<ProductCreatePage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
