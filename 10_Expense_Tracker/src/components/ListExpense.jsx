import { useContext, useState } from "react";
import { expenseContext } from "../context/ExpenseContext";

const ListExpense = () => {
  const { expenseList, DeleteExpense, handleEdit } = useContext(expenseContext);

  const [expenseQuery, setExpenseQuery] = useState({
    title: "",
    Type: "all",
    Category: "all",
    sort: "",
  });

  const handleChange = (field, e) => {
    setExpenseQuery((prev) => {
      return {
        ...prev,
        [field]: e.target.value,
      };
    });
  };

  const filterList = expenseList
    .filter((l) =>
      l.Title?.toLowerCase().includes(expenseQuery.title.toLowerCase())
    )
    .filter((l) =>
      expenseQuery.Type === "all" ? true : l.Type === expenseQuery.Type,
    )
    .filter((l) =>
      expenseQuery.Category === "all" ? true : l.Category === expenseQuery.Category,
    )

  const handleSubmit = (e) => {
    e.preventDefault();


  };
  console.log("expenseQuery", expenseQuery)

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>

          <label htmlFor="">Search</label>
          <input type="text" placeholder="enter title"
            value={expenseQuery.title}
            onChange={(e) => handleChange("title", e)} />

          <label htmlFor="">Category</label>
          <select name="" id="" value={expenseQuery.Category}
            onChange={(e) => handleChange("Category", e)}>
            <option value="">Select</option>
            <option value="Money Transfer">Money Transfer</option>
            <option value="Cash Withdrawal">Cash Withdrawal</option>
            <option value="General Expense">General Expense</option>
            <option value="Food&Dining">Food&Dining</option>
            <option value="HealthCare">HealthCare</option>
            <option value="Shopping">Shopping</option>
            <option value="Travel">Travel</option>
          </select>

          <label htmlFor="">Type</label>
          <select
            value={expenseQuery.Type}
            onChange={(e) => handleChange("Type", e)}
          >
            <option value="">Select Type</option>
            <option value="debit">Debit</option>
            <option value="credit">Credit</option>
          </select>

          <label htmlFor="">sort</label>
          <select name="" id="" value={expenseQuery.sort}
            onChange={(e) => handleChange("sort", e)}>
            <option value="">Select Type</option>
            <option value="asc">ascending</option>
            <option value="desc">descending</option>
            <option value="moneyAsc">Money Ascending</option>
            <option value="moneyDsc">Money Descending</option></select>
        </form>
      </div>

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
            {filterList.map((expense, index) => (
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
    </>
  );
};

export default ListExpense;