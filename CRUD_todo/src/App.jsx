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

  const [editVal, setEditVal] = useState(null);

  const handleAdd = (input) => {
    if (!input.task || !input.description) {
      alert("task data required");
      return;
    } else if (editVal) {
      setTodos((todo) =>
        todo.map((t) =>
          t.id === editVal.id
            ? { task: input.task, description: input.description }
            : t,
        ),
      );

      setEditVal(null);
    } else {
      const newTodo = {
        id: new Date().getTime(),
        task: input.task,
        description: input.description,
      };

      setTodos((prev) => [...prev, newTodo]);

      alert("todo added successfully");
    }
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const handleEdit = (id) => {
    const todo = todos.find((t) => t.id === id);

    setEditVal(todo);
  };

  return (
    <>
      <AddTodo handleAdd={handleAdd} editVal={editVal} />
      <br />
      <br />

      <ListTodo
        todos={todos}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </>
  );
};

export default App;