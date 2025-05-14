import { db } from "./firebase.js";
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

async function fetchTodos() {
    const snapshot = await getDocs(collection(db, "todos"));
    snapshot.forEach(doc => {
        console.log(doc.id, doc.data());
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchTodos();
    initEventHandlers();
});
