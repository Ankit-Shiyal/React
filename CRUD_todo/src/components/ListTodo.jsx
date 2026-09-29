import React from "react";

const ListTodo = ({
    todos,
    handleDelete,
    handleEdit,
    handleCheck,
}) => {
    return (
        <>
            <table border="1" className="table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>status</th>
                        <th>task</th>
                        <th>description</th>
                        <th colSpan={2}>actions</th>
                    </tr>
                </thead>

                <tbody>
                    {todos.map((t, index) => {
                        return (
                            <tr key={t.id}>
                                <td>{index + 1}</td>

                                <td>
                                    <input
                                        type="checkbox"
                                        checked={t.completed}
                                        onChange={() => handleCheck(t.id)}
                                    />
                                </td>

                                <td
                                    style={{
                                        textDecoration: t.completed
                                            ? "line-through"
                                            : "none",
                                    }}
                                >
                                    {t.task}
                                </td>

                                <td
                                    style={{
                                        textDecoration: t.completed
                                            ? "line-through"
                                            : "none",
                                    }}
                                >
                                    {t.description}
                                </td>

                                <td>
                                    <button
                                        className="button"
                                        onClick={() => handleEdit(t.id)}
                                    >
                                        edit
                                    </button>
                                </td>

                                <td>
                                    <button
                                        className="button"
                                        onClick={() => handleDelete(t.id)}
                                    >
                                        delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default ListTodo;