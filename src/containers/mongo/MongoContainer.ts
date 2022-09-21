import MongoInstance from "./MongoInstance";

import { Cart, Product } from "./models";

export default class MongoContainer {
  cart = Cart;
  product = Product;

  constructor() {
    MongoInstance.connect();
  }
}
