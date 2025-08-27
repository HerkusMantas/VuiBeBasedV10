// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAthbIFESHt5c1hPGmmiS8qlEN6ybYzFcg",
  authDomain: "vui-be-based-v10.firebaseapp.com",
  projectId: "vui-be-based-v10",
  storageBucket: "vui-be-based-v10.firebasestorage.app",
  messagingSenderId: "795520495464",
  appId: "1:795520495464:web:06592a00644a64d388f0dd"
};

// 3. Inicializuojame Firebase aplikaciją
// Tai reikia padaryti tik vieną kartą visoje programoje
const app = initializeApp(firebaseConfig);

// 4. Gauname prieigą prie konkrečių Firebase paslaugų
// Šiuos kintamuosius naudosime kituose programos failuose
const db = getFirestore(app);
const auth = getAuth(app);

// 5. Eksportuojame paslaugas, kad galėtume jas naudoti kitur
export { db, auth };

// Autentifikacijos funkcijos
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function register(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

export function getCurrentUser() {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      unsubscribe();
      resolve(user);
    });
  });
}