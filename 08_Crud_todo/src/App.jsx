import React, { useState } from "react";
import AddTodo from "./components/AddTodo";

const App = () => {
  const initialTodos = [
    {
      id: 1,
      task: "learn react",
      description: "you have to learn react daily",
    },
    {
      id: 2,
      task: "practice react concept code",
      description:
        "you have to understand react concept and practice",
    },
  ];

  const [todos, setTodos] = useState(initialTodos);

  const handleAdd = (input) => {
    const newTodo = {
      id: Date.now(),
      task: input.task,
      description: input.description,
    };

    setTodos((prev) => [...prev, newTodo]);
  };

  return (
    <>
      <h1>Todo App</h1>

      <AddTodo handleAdd={handleAdd} />

      <br />

      <h2>Todo List</h2>

      {todos.map((todo) => (
        <div key={todo.id}>
          <h4>Task: {todo.task}</h4>
          <p>Description: {todo.description}</p>
      
        </div>
      ))}
    </>
  );
};

export default App;