const express = require('express');
const app = express();
const port = 3000;

// Serve the home route with the To-Do list application
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>To-Do List</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f4f9f9;
          color: #333;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        header {
          background-color: #00aaff;
          padding: 15px;
          text-align: center;
          color: white;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        main {
          flex: 1;
          padding: 20px;
          text-align: center;
        }
        footer {
          background-color: #00aaff;
          padding: 15px;
          text-align: center;
          color: white;
          box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
        }
        input[type="text"] {
          padding: 10px;
          font-size: 16px;
          border: 2px solid #00aaff;
          border-radius: 5px;
          width: 300px;
          margin-right: 10px;
          outline: none;
        }
        input[type="text"]:focus {
          border-color: #0077cc;
        }
        button {
          padding: 10px 20px;
          font-size: 16px;
          color: white;
          background-color: #0077cc;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        button:hover {
          background-color: #005fa3;
        }
        ul {
          list-style-type: none;
          padding: 0;
        }
        li {
          background: #ffffff;
          margin: 10px auto;
          padding: 15px;
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          max-width: 500px;
          text-align: left;
        }
        .remove {
          background: #ff4c4c;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .remove:hover {
          background: #cc0000;
        }
      </style>
    </head>
    <body>
      <header>
        <h1>To-Do List</h1>
      </header>
      <main>
        <input type="text" id="todoInput" placeholder="Add a new task">
        <button id="addTodo">Add Task</button>
        <ul id="todoList"></ul>
      </main>
      <footer>
        <p>© 2024 To-Do List App</p>
      </footer>
      <script>
        // Function to update the To-Do list from local storage
        function updateTodoList() {
          const todoList = document.getElementById('todoList');
          todoList.innerHTML = '';
          const todos = JSON.parse(localStorage.getItem('todos')) || [];
          todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.innerHTML = \`
              <span>\${todo}</span>
              <button class="remove" onclick="removeTodo(\${index})">Remove</button>
            \`;
            todoList.appendChild(li);
          });
        }

        // Function to add a new To-Do item
        function addTodo() {
          const input = document.getElementById('todoInput');
          const newTodo = input.value.trim();
          if (newTodo) {
            const todos = JSON.parse(localStorage.getItem('todos')) || [];
            todos.push(newTodo);
            localStorage.setItem('todos', JSON.stringify(todos));
            input.value = '';
            updateTodoList();
          }
        }

        // Function to remove a To-Do item
        function removeTodo(index) {
          const todos = JSON.parse(localStorage.getItem('todos')) || [];
          todos.splice(index, 1);
          localStorage.setItem('todos', JSON.stringify(todos));
          updateTodoList();
        }

        document.getElementById('addTodo').addEventListener('click', addTodo);

        // Initialize the To-Do list on page load
        document.addEventListener('DOMContentLoaded', updateTodoList);
      </script>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
