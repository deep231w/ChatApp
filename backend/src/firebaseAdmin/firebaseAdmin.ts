import admin from "firebase-admin";
import path from "path";
// const serviceAccount = require(path.join(__dirname, "../../firebase-admin/serviceAccountKey.json"));

import serviceAccount from "../firebase-admin/serviceAccountKey.json"
if(!serviceAccount){
  console.log("no service account key ");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount), // Fix: Type assertion
  databaseURL: "https://chatapp-6a195-default-rtdb.firebaseio.com",
});

export default admin;
