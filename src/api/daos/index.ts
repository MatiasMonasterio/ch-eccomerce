import { ProductFirebaseDAO, ProductFileDAO, ProductMongoDAO } from "./products";
import { CartsFirebaseDAO, CartFileDao, CartsMongoDAO } from "./carts";

import { STOREGE } from "../../config/env";

let ProductDAO;
let CartDAO;

if (STOREGE === "file") {
  ProductDAO = ProductFileDAO;
  CartDAO = CartFileDao;
} else if (STOREGE === "firebase") {
  ProductDAO = ProductFirebaseDAO;
  CartDAO = CartsFirebaseDAO;
} else if (STOREGE === "mongo") {
  ProductDAO = ProductMongoDAO;
  CartDAO = CartsMongoDAO;
} else {
  ProductDAO = ProductMongoDAO;
  CartDAO = CartsMongoDAO;
}

export const productDAO = new ProductDAO();
export const cartDAO = new CartDAO();
