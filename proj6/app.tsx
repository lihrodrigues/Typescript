// src/App.tsx
import React, { useState } from 'react';

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState<string>("");

  // Função para adicionar um item
  const addTodo = () => {
    if (task.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        task: task,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setTask("");
    }
  };

  // Função para remover um item
  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Função para alternar a conclusão de uma tarefa
  const toggleComplete = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Todo List</h2>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Adicionar nova tarefa"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addTodo}>Adicionar</button>
      </div>

      <ul className="list-group">
        {todos.map((todo) => (
          <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <input
                type="checkbox"
                className="form-check-input me-2"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />
              <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                {todo.task}
              </span>
            </div>
            <button className="btn btn-danger btn-sm" onClick={() => removeTodo(todo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
