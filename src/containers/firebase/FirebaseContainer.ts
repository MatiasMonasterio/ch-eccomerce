import admin from "firebase-admin";
import firestoreInstance from "./firestore";

export default class FirebaseContainer {
  products: admin.firestore.CollectionReference<admin.firestore.DocumentData>;
  carts: admin.firestore.CollectionReference<admin.firestore.DocumentData>;

  constructor() {
    const firestore = firestoreInstance;

    this.products = firestore.collection("products");
    this.carts = firestore.collection("carts");
  }
}
