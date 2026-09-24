import React from "react";

const ListTodo = ({ todos }) => {
  return (
    <>
      <table border="1">
        <thead>
          <tr>
            <th>id</th>
            <th>task</th>
            <th>description</th>
            
          </tr>
        </thead>

        <tbody>
          {todos.map((t, index) => {
            return (
              <tr key={t.id}>
                <td>{index + 1}</td>
                <td>{t.task}</td>
                <td>{t.description}</td>
                             </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ListTodo;