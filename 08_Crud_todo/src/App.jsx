import React, { useState } from "react";
import AddTodo from "./components/AddTodo";
import ListTodo from "./components/ListTodo";

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
      description: "you have to understand react concept and practice",
    },
  ];

  const [todos, setTodos] = useState(initialTodos);

  const handleAdd = (input) => {
    const newTodo = {
      id: new Date().getTime(),
      task: input.task,
      description: input.description,
    };

    setTodos((prev) => [...prev, newTodo]);

    alert("todo added successfully");
  };

  return (
    <>
      <AddTodo handleAdd={handleAdd} />
      <ListTodo todos={todos} />
    </>
  );
};

export default App;