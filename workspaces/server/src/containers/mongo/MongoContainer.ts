import MongoInstance from "./MongoInstance";

import { Cart, Product, User } from "./models";

export default class MongoContainer {
  cart = Cart;
  product = Product;
  user = User;

  constructor() {
    MongoInstance.connect();
  }
}
