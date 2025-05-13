let todos = [];

function addTodo(text, priority) {
    const todo = {
        id: Date.now(),
        text,
        completed: false,
        priority,
    };
    todos.push(todo);
    renderTodos();
}

function renderTodos() {
    const pendingList = document.getElementById('pending-list');
    const completedList = document.getElementById('completed-list');

    pendingList.innerHTML = '';
    completedList.innerHTML = '';

    const pending = todos
        .filter(t => !t.completed)
        .sort((a, b) => priorityValue(b.priority) - priorityValue(a.priority));
    const completed = todos.filter(t => t.completed);

    if (pending.length === 0) {
        const msg = document.createElement('p');
        msg.textContent = 'No pending items.';
        msg.className = 'text-center text-muted';
        pendingList.appendChild(msg);
    } else {
        pending.forEach(todo => pendingList.appendChild(createTodoItem(todo)));
    }

    if (completed.length === 0) {
        const msg = document.createElement('p');
        msg.textContent = 'No completed items.';
        msg.className = 'text-center text-muted';
        completedList.appendChild(msg);
    } else {
        completed.forEach(todo => completedList.appendChild(createTodoItem(todo)));
    }
}

function createTodoItem(todo) {
    const li = document.createElement('li');
    li.className = 'list-group-item';

    const span = document.createElement('span');
    span.className = 'me-auto'
    span.textContent = todo.text;

    const badge = document.createElement('span');
    badge.className = `badge priority-${todo.priority.toLowerCase()}`;
    badge.textContent = todo.priority;

    const btn = document.createElement('button');
    btn.className = 'btn btn-sm btn-outline-success';
    btn.textContent = todo.completed ? 'Undo' : 'Done';
    btn.onclick = () => {
        todo.completed = !todo.completed;
        renderTodos();
    };

    li.appendChild(span);
    li.appendChild(badge);
    li.appendChild(btn);
    return li;
}

function filterTodos(query) {
    const pendingList = document.getElementById('pending-list');
    [...pendingList.children].forEach(li => {
        const text = li.firstChild.textContent.toLowerCase();
        li.style.display = text.includes(query) ? '' : 'none';
    });
}

function priorityValue(level) {
    return level === 'High' ? 3 : level === 'Medium' ? 2 : 1;
}
