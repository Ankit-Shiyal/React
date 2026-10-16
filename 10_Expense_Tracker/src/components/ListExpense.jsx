import { useContext } from "react";
import { expenseContext } from "../context/ExpenseContext";

const ListExpense = () => {
  const { expenseList, DeleteExpense, handleEdit } = useContext(expenseContext);

  return (
    <div>
      <h2>Expense List</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Category</th>
            <th>Type</th>
            <th colSpan="2">Action</th>
          </tr>
        </thead>

        <tbody>
          {expenseList.map((expense, index) => (
            <tr key={expense.id}>
              <td>{index + 1}</td>
              <td>{expense.Title}</td>
              <td>{expense.Description}</td>
              <td>₹{expense.Amount}</td>
              <td>{expense.Date}</td>
              <td>{expense.Category}</td>
              <td>{expense.Type}</td>
              <td>
                <button onClick={() => handleEdit(expense.id)}>Update</button>
              </td>
              <td>
                <button onClick={() => DeleteExpense(expense.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListExpense;