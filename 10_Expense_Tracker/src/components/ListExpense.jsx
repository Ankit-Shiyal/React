
const ListExpense = ({ expenseList }) => {
  return (
    <div className="expense-list">
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
          </tr>
        </thead>

        <tbody>
          {expenseList.length === 0 ? (
            <tr>
              <td colSpan="6">No Data Found</td>
            </tr>
          ) : (
            expenseList.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.id}</td>
                <td>{expense.Title}</td>
                <td>{expense.Description}</td>
                <td>₹{expense.Amount}</td>
                <td>{expense.Date}</td>
                <td>{expense.Category }</td>
                <td>{expense.Type }</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListExpense;
