import { ProductFirebaseDAO, ProductFileDAO, ProductMongoDAO } from "./products";
import { CartsFirebaseDAO, CartFileDao, CartsMongoDAO } from "./carts";
import { UserMongoDAO } from "./users";

import { STOREGE } from "../../config/env";

let ProductDAO;
let CartDAO;
let UserDAO;

if (STOREGE === "file") {
  ProductDAO = ProductFileDAO;
  CartDAO = CartFileDao;
  UserDAO = UserMongoDAO; // fix
} else if (STOREGE === "firebase") {
  ProductDAO = ProductFirebaseDAO;
  CartDAO = CartsFirebaseDAO;
  UserDAO = UserMongoDAO; // fix
} else if (STOREGE === "mongo") {
  ProductDAO = ProductMongoDAO;
  CartDAO = CartsMongoDAO;
  UserDAO = UserMongoDAO;
} else {
  ProductDAO = ProductMongoDAO;
  CartDAO = CartsMongoDAO;
  UserDAO = UserMongoDAO; // fix
}

export const productDAO = new ProductDAO();
export const cartDAO = new CartDAO();
export const userDAO = new UserDAO();
