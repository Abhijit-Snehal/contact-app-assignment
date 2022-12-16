import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
 const firebaseConfig = {
    apiKey: "AIzaSyDaNwH8BYfc3CkI69Wd-xd1q8ATVe3i-Xo",
    authDomain: "profile-img-contact-app.firebaseapp.com",
    projectId: "profile-img-contact-app",
    storageBucket: "profile-img-contact-app.appspot.com",
    messagingSenderId: "485543728570",
    appId: "1:485543728570:web:ed101d3178164e5ec3b983"
  };
// Firebase storage referenc
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;