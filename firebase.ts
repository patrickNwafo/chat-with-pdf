import { getApps, getApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCgWcQfmjAXUk8-INFkstvwGqt8mOpK2KA",
    authDomain: "chat-with-pdf-fd86a.firebaseapp.com",
    projectId: "chat-with-pdf-fd86a",
    storageBucket: "chat-with-pdf-fd86a.appspot.com",
    messagingSenderId: "777342764588",
    appId: "1:777342764588:web:812a325aab139bc7b07389",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
