function initEventHandlers() {

    renderTodos();
    
    const form = document.getElementById('todo-form');
    const searchInput = document.getElementById('search-input');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = document.getElementById('todo-input').value.trim();
        const priority = document.getElementById('todo-priority').value;
        if (text !== '') {
            addTodo(text, priority);
            form.reset();
        }
    });

    searchInput.addEventListener('input', () => {
        filterTodos(searchInput.value.toLowerCase());
    });
}
