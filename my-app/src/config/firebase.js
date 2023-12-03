import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCXUblavOTW-UCJc93ukkyYScPaD-u_CzE",
  authDomain: "cs409-alumniweb.firebaseapp.com",
  projectId: "cs409-alumniweb",
  storageBucket: "cs409-alumniweb.appspot.com",
  messagingSenderId: "551330777315",
  appId: "1:551330777315:web:1c9cf896b3662a7e245dd6",
  measurementId: "G-1D1MJ85D6J"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);

export default app;
