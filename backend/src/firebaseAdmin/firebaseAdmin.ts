import admin from "firebase-admin";
//import serviceAccount from "./../config/serviceAccountKey.json";
 const serviceAccount = require("../firebase-admin/serviceAccountKey");

// import dotenv from "dotenv";

// dotenv.config();

// const serviceAccount= process.env.FIREBASE_ADMIN_CREDENTIALS; 

console.log(serviceAccount);

if(!serviceAccount){
  console.log("no service account key ");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount), // Fix: Type assertion
  databaseURL: "https://chatapp-6a195-default-rtdb.firebaseio.com",
});

export default admin;
