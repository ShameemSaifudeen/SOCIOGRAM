
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAsioGfywsLMykfu5ud_BU2nmO1d42tWKc",
  authDomain: "sociograam-32411.firebaseapp.com",
  projectId: "sociograam-32411",
  storageBucket: "sociograam-32411.appspot.com",
  messagingSenderId: "592975558001",
  appId: "1:592975558001:web:c53ab318e63c4267fdf2d0",
  measurementId: "G-B1DV2FKR8M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth,provider}