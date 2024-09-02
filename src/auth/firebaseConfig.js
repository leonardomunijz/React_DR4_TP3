// src/auth/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Importe getFirestore para inicializar o Firestore

// Configuração do Firebase do seu app
const firebaseConfig = {
  apiKey: "AIzaSyB3vlzABFVWwXsxSLBbTU4iCnloQCZRvEw",
  authDomain: "react-dr4-tp3.firebaseapp.com",
  projectId: "react-dr4-tp3",
  storageBucket: "react-dr4-tp3.appspot.com",
  messagingSenderId: "771362683219",
  appId: "1:771362683219:web:2851a3c7b31c2846ad49a6"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Obtém o objeto de autenticação do Firebase
export const auth = getAuth(app);

// Inicializa o Firestore
export const db = getFirestore(app); // Exporta a instância do Firestore

export default app;
