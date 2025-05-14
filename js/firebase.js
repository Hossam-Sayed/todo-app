import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAtRB4XiOSWmzbz4iveFRV4BR1bByRa1kQ",
    authDomain: "todoapp-6b203.firebaseapp.com",
    projectId: "todoapp-6b203",
    storageBucket: "todoapp-6b203.firebasestorage.app",
    messagingSenderId: "1969307447",
    appId: "1:1969307447:web:d136d8ddb9893601e5e4b2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
