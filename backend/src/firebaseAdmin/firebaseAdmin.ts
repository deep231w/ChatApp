import admin from "firebase-admin";
import serviceAccount from "../config/serviceAccountKey.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount), 
  databaseURL: "https://chatapp-6a195-default-rtdb.firebaseio.com",
});

export default admin;
