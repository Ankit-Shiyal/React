import React, { useState } from "react";

const AddTodo = ({ handleAdd }) => {
  const [input, setInput] = useState({
    task: "",
    description: "",
  });

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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter task name"
          value={input.task}
          onChange={(e) => handleChange("task", e)}
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="enter description"
          value={input.description}
          onChange={(e) => handleChange("description", e)}
        />

        <br />
        <br />

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default AddTodo;