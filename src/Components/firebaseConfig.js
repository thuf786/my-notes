
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyDgATghWKJjhHVmb2PgC5Fiw8idwBr5Vio",
    authDomain: "my-notes-629ef.firebaseapp.com",
    projectId: "my-notes-629ef",
    storageBucket: "my-notes-629ef.firebasestorage.app",
    messagingSenderId: "577213785104",
    appId: "1:577213785104:web:96eb5a67ecbdb419f95695",
    measurementId: "G-C50DT52CGN"
  };
  


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};