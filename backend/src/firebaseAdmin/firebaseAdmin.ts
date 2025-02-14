

import admin from "firebase-admin";
import path from "path";

// Load the service account JSON file
const serviceAccount = require(path.join(__dirname, "config/serviceAccountKey.json"));

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chatapp-6a195-default-rtdb.firebaseio.com", // Replace with your actual database URL
});

export default admin;
