import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAxjd1qVH32ipQg-fuKBRMcTr8HSl_lyZI",
    authDomain: "s7-star-wars-74840.firebaseapp.com",
    projectId: "s7-star-wars-74840",
    storageBucket: "s7-star-wars-74840.firebasestorage.app",
    messagingSenderId: "765738497821",
    appId: "1:765738497821:web:19fc6be2addb75a3ef13f4"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);

