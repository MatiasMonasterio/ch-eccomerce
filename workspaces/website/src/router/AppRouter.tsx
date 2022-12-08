import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { UserProvider } from "../contexts/user";
import { MainLayout } from "../layouts";

const LoginPage = lazy(() => import("../pages/Login"));
const RegisterPage = lazy(() => import("../pages/Register"));
const HomePage = lazy(() => import("../pages/Home"));
const CartsPage = lazy(() => import("../pages/Cart"));
const AccountPage = lazy(() => import("../pages/Account"));
const ProductPage = lazy(() => import("../pages/Product"));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="cart" element={<CartsPage />} />
              <Route path="account" element={<AccountPage />} />
              <Route path="/product/:productId" element={<ProductPage />} />
            </Route>

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Suspense>
      </UserProvider>
    </BrowserRouter>
  );
}
