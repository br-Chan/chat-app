// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCIfR1c-BvZxkqRmLuijrpsZWha1NlAEo",
  authDomain: "rankle-73d71.firebaseapp.com",
  projectId: "rankle-73d71",
  storageBucket: "rankle-73d71.appspot.com",
  messagingSenderId: "756873187999",
  appId: "1:756873187999:web:f3434d0a00831bb1edc8aa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const ai = getAI(app, { backend: new GoogleAIBackend() });
const model = getGenerativeModel(ai, { model: "gemini-2.5-flash" });
