import admin from "firebase-admin";

const serviceAccount = require("../firebase-admin/serviceAccountKey");


if(!serviceAccount){
  console.log("no service account key ");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount), // Fix: Type assertion
  databaseURL: "https://chatapp-6a195-default-rtdb.firebaseio.com",
});

export default admin;
