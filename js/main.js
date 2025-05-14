import { db } from "./firebase.js";
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { todos } from "./dom.js";
import { renderTodos } from "./dom.js";
import { initEventHandlers } from "./handlers.js";

export async function fetchTodos() {
    try {
        const snapshot = await getDocs(collection(db, 'todos'));
        todos.length = 0;
        todos.push(...snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        console.log(todos);
        renderTodos();
    } catch (err) {
        console.error("Error fetching todos:", err);
        alert("Could not load todos.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchTodos();
    initEventHandlers();
});
