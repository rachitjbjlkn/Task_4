// Get references to the form, input, and list elements
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

// Load todos from localStorage, or start with an empty array
let todos = JSON.parse(localStorage.getItem("todos-advanced")) || [];

// Save todos to localStorage
function save() {
  localStorage.setItem("todos-advanced", JSON.stringify(todos));
}

// Render the todo list
function render() {
  list.innerHTML = ""; // Clear the list first
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = "todo-item" + (todo.completed ? " completed" : "");

    // Set up the HTML for each todo item
    li.innerHTML = `
      <input type="checkbox" ${todo.completed ? "checked" : ""}>
      <span class="todo-text">${todo.text}</span>
      <button class="edit">✏️</button>
      <button class="del">🗑️</button>
    `;

    // Toggle completed state
    li.querySelector("input").onchange = () => {
      todo.completed = !todo.completed;
      save();
      render();
    };

    // Edit the todo text
    li.querySelector(".edit").onclick = () => {
      const newText = prompt("Edit task:", todo.text);
      if (newText) {
        todo.text = newText;
        save();
        render();
      }
    };

    // Delete the todo
    li.querySelector(".del").onclick = () => {
      todos.splice(index, 1);
      save();
      render();
    };

    list.appendChild(li);
  });
}

// Handle form submission to add a new todo
form.onsubmit = (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    todos.unshift({ text, completed: false });
    save();
    render();
    input.value = "";
  }
};
render();
