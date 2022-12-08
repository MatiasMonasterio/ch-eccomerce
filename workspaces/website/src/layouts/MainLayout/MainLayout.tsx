import { Outlet } from "react-router-dom";

import { CartProvider } from "../../contexts/cart";
import { Navbar } from "./components";

export default function MainLayout() {
  return (
    <CartProvider>
      <Navbar />
      <Outlet />
    </CartProvider>
  );
}
