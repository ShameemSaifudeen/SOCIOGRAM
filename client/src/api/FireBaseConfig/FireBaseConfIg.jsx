import configKeys from "../../config";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: configKeys.apiKey,
  authDomain: configKeys.authDomain,
  projectId: configKeys.projectId,
  storageBucket: configKeys.storageBucket,
  messagingSenderId: configKeys.messagingSenderId,
  appId: configKeys.fireBaseAppId,
  measurementId: configKeys.measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth,provider}