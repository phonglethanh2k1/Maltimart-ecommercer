// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDab7nhrMmIbrLUj1utnhf0aqx-E_peDhc',
  authDomain: 'maltimart-66145.firebaseapp.com',
  projectId: 'maltimart-66145',
  storageBucket: 'maltimart-66145.appspot.com',
  messagingSenderId: '87030441475',
  appId: '1:87030441475:web:dc8fba787d195a32d05036',
  measurementId: 'G-XX2HJCSJND',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
