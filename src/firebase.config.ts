// Import the functions you need from the SDKs you need
import * as Firestore from "firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLmsJFslAOFo9aOKzuvClJY2Wo_o9vyO8",
  authDomain: "gmifc-e0dcb.firebaseapp.com",
  projectId: "gmifc-e0dcb",
  storageBucket: "gmifc-e0dcb.appspot.com",
  messagingSenderId: "975440328762",
  appId: "1:975440328762:web:64ea0b78fe8354a5911d03",
  measurementId: "G-KPHJZT6SEY",
};

// Initialize Firebase
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const app = initializeApp(firebaseConfig);
export const firebaseDB = Firestore.getFirestore();

export const getCollections = <T>(path: string) => {
  return Firestore.collection(
    firebaseDB,
    path
  ) as Firestore.CollectionReference<T>;
};

export const deleteDocument = async (collectionPath: string, docId: string) => {
  const doc = Firestore.doc(firebaseDB, `${collectionPath}/${docId}`);
  await Firestore.deleteDoc(doc);
};
export const updateDocument = <T extends Record<string, any>>(
  collectionPath: string,
  id: string,
  data: T
) => {
  const doc = Firestore.doc(firebaseDB, `${collectionPath}/${id}`);
  Firestore.updateDoc(doc, data);
};
