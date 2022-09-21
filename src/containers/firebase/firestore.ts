import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

import serviceAccount from "../../config/firebase";

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const firestore = getFirestore();

export default firestore;
