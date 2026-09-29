import React, { useEffect, useState } from "react";
import "./style.css";

const AddTodo = ({ handleAdd, editVal, todos }) => {
  const [input, setInput] = useState({
    task: "",
    description: "",
  });

  useEffect(() => {
    if (editVal) {
      setInput({
        task: editVal.task,
        description: editVal.description,
      });
    }
  }, [editVal]);

  const handleChange = (field, e) => {
    setInput((prev) => {
      return {
        ...prev,
        [field]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleAdd(input);

    setInput({
      task: "",
      description: "",
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <input
          className="input"
          type="text"
          placeholder="enter task name"
          value={input.task}
          onChange={(e) => handleChange("task", e)}
        />

        <br />
        <br />

        <input
          className="input"
          type="text"
          placeholder="enter description"
          value={input.description}
          onChange={(e) => handleChange("description", e)}
        />

        <br />
        <br />

        <button className="btn" type="submit">
          {editVal ? "update" : "add"}
        </button>
      </form>
    </>
  );
};

export default AddTodo;