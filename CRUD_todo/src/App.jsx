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

  const completedTasks = todos.filter((todo) => todo.completed);
  const pendingTasks = todos.filter((todo) => !todo.completed);

  return (
    <>
      <div className="dashboard">
        <div className="box">
          <h3>All Task</h3>
          <h2>{todos.length}</h2>
        </div>

        <div className="box">
          <h3>Completed Task</h3>
          <h2>{completedTasks.length}</h2>
        </div>

        <div className="box">
          <h3>Pending Task</h3>
          <h2>{pendingTasks.length}</h2>
        </div>
      </div>
      <br />
      <br />

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