// src/firebase.js
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB_VVS0eP7t52buxqJS8vtcFbbujUDV6iY",
  authDomain: "ecom-2ec78.firebaseapp.com",
  projectId: "ecom-2ec78",
  storageBucket: "ecom-2ec78.firebasestorage.app",
  messagingSenderId: "830446570008",
  appId: "1:830446570008:web:a4a98d5d8f078e249d116d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, deleteDoc, doc };
