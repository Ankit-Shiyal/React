import React, { useState } from "react";
import AddTodo from "./components/AddTodo";
import ListTodo from "./components/ListTodo";

const App = () => {
  const initialTodos = [
    {
      id: 1,
      task: "learn react",
      description: "you have to learn react daily",
      completed: false,
    },
    {
      id: 2,
      task: "practice react concept code",
      description: "you have to understand react concept and practice",
      completed: false,
    },
  ];

  const [todos, setTodos] = useState(initialTodos);
  const [editVal, setEditVal] = useState(null);


  const handleAdd = (input) => {
    if (!input.task || !input.description) {
      alert("task data required");
      return;
    }
    if (editVal) {
      setTodos((prev) =>
        prev.map((t) =>
          t.id === editVal.id
            ? {
                ...t,
                task: input.task,
                description: input.description,
              }
            : t
        )
      );

      setEditVal(null);
    }
    else {
      const newTodo = {
        id: new Date().getTime(),
        task: input.task,
        description: input.description,
        completed: false,
      };

      setTodos((prev) => [...prev, newTodo]);

      alert("todo added successfully");
    }
  };

    const handleDelete = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const handleEdit = (id) => {
    const todo = todos.find((t) => t.id === id);

    setEditVal(todo);
  };

  const handleCheck = (id) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              completed: !t.completed,
            }
          : t
      )
    );
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
        handleCheck={handleCheck}
      />
    </>
  );
};

export default App;