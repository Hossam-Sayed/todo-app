import { db } from './firebase.js';
import {
    addDoc,
    collection,
    doc,
    updateDoc,
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';
import { fetchTodos } from './main.js';

export const todos = [];

export const addTodoToFirestore = async (text, priority) => {
    try {
        const todo = { title: text, completed: false, priority };
        await addDoc(collection(db, 'todos'), todo);
        await fetchTodos();
    } catch (err) {
        console.error('Error adding todo:', err);
        alert('Could not add todo.');
    }
};

export const renderTodos = () => {
    const pendingList = document.getElementById('pending-list');
    const completedList = document.getElementById('completed-list');

    pendingList.innerHTML = '';
    completedList.innerHTML = '';

    const byPriority = (a, b) => priorityValue(b.priority) - priorityValue(a.priority);
    const pending = todos.filter(t => !t.completed).sort(byPriority);
    const completed = todos.filter(t => t.completed);

    renderList(pendingList, pending, 'No pending todos');
    renderList(completedList, completed, 'No completed todos');
};

const renderList = (container, items, emptyMsg) => {
    if (items.length === 0) {
        const msg = document.createElement('p');
        msg.textContent = emptyMsg;
        msg.className = 'text-center text-muted';
        container.appendChild(msg);
    } else {
        items.forEach(todo => container.appendChild(createTodoItem(todo)));
    }
};

const createTodoItem = todo => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    const span = document.createElement('span');
    span.className = 'me-auto';
    span.textContent = todo.title;

    const badge = document.createElement('span');
    badge.className = `badge priority-${todo.priority.toLowerCase()}`;
    badge.textContent = todo.priority;

    const btn = document.createElement('button');
    btn.className = 'btn btn-sm btn-outline-success';
    btn.textContent = todo.completed ? 'Undo' : 'Done';

    btn.onclick = async () => {
        try {
            const todoRef = doc(db, 'todos', todo.id);
            await updateDoc(todoRef, { completed: !todo.completed });
            await fetchTodos();
        } catch (err) {
            console.error('Failed to update todo:', err);
            alert('Could not update todo status.');
        }
    };

    li.append(span, badge, btn);
    return li;
};

export const filterTodos = query => {
    const pendingList = document.getElementById('pending-list');
    [...pendingList.children].forEach(li => {
        const text = li.firstChild.textContent.toLowerCase();
        li.style.display = text.includes(query) ? '' : 'none';
    });
};

const priorityValue = level => ({
    High: 3,
    Medium: 2,
    Low: 1,
})[level] || 0;
