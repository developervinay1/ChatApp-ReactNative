// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCADshFZTwVm20JarnydmSxpAixofp9P48",
  authDomain: "chatapp-rn-98885.firebaseapp.com",
  projectId: "chatapp-rn-98885",
  storageBucket: "chatapp-rn-98885.appspot.com",
  messagingSenderId: "31130937578",
  appId: "1:31130937578:web:2a08dde97d7b91df7b0f93",
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
