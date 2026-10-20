import { useState, useContext, useEffect } from "react";
import { expenseContext } from "../context/ExpenseContext";

const initialForm = {
  Title: "",
  Description: "",
  Amount: "",
  Date: "",
  Category: "",
  Type: "",
};

const Add = () => {
  const { addExpense, editVal } = useContext(expenseContext);
  const [input, setInput] = useState(initialForm);

  useEffect(() => {
    editVal ? setInput(editVal) : null;
  }, [editVal]);


  const handleChange = (field, e) => {
    setInput((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addExpense({
      ...input,
      Amount: Number(input.Amount),
    });

    setInput(initialForm);
  };

  return (
    <div>
      <h1>Expense Management</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Title"
          value={input.Title}
          onChange={(e) => handleChange("Title", e)}
          required
        />
        <br />
        <br />

        <input
          type="text"
          placeholder="Enter Description"
          value={input.Description}
          onChange={(e) => handleChange("Description", e)}
          required
        />
        <br />
        <br />

        <input
          type="number"
          placeholder="Enter Amount"
          value={input.Amount}
          onChange={(e) => handleChange("Amount", e)}
          min="0.01"
          step="0.01"
          required
        />
        <br />
        <br />

        <input
          type="date"
          value={input.Date}
          onChange={(e) => handleChange("Date", e)}
          required
        />
        <br />
        <br />
        <select name="" id="" value={input.Category}
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


        <br />
        <br />

        <select
          value={input.Type}
          onChange={(e) => handleChange("Type", e)}
          required
        >
          <option value="">Select Type</option>
          <option value="debit">Debit</option>
          <option value="credit">Credit</option>
        </select>
        <br />
        <br />

        <button type="submit">{editVal ? "update" : "add"}</button>
      </form>
    </div>
  );
};

export default Add;