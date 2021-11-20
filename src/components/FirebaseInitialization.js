// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCZ38H-qKrG7YpK7G0YBfVUkAsvgQPrRgk",

  authDomain: "shopping-cart-2f895.firebaseapp.com",

  projectId: "shopping-cart-2f895",

  storageBucket: "shopping-cart-2f895.appspot.com",

  messagingSenderId: "852006140292",

  appId: "1:852006140292:web:3f241ea60673432b79c5d1",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export { app };
