import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
import { getFirestore } from '@firebase/firestore'
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA08-TUIq7T6xqpoujBn3JU4kd74kfRaPU",
    authDomain: "real-estate-ecfee.firebaseapp.com",
    projectId: "real-estate-ecfee",
    storageBucket: "real-estate-ecfee.appspot.com",
    messagingSenderId: "170881199467",
    appId: "1:170881199467:web:86d4fb74710a07342cf02e",
    measurementId: "G-DGLVWVZPCV"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const db = getFirestore(app)
export const auth = getAuth(app);