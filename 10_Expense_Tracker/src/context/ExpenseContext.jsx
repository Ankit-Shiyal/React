
import { createContext, useState } from "react";

export const expenseContext = createContext({
  expenseList: [],
  addExpense: () => {},
  DeleteExpense: () => {},
  editVal: null,
  handleEdit: () => {},
  setEditVal: () => {},
  debit: 0,
  credit: 0,
  balance: 0,
});

const initialValues = [
  {
    id: 1,
    Title: "Food",
    Description: "Lunch",
    Amount: 1000,
    Date: "2026-10-14",
    Category: "food",
    Type: "debit",
  },
  {
    id: 2,
    Title: "Sports",
    Description: "Equipment",
    Amount: 5000,
    Date: "2026-10-14",
    Category: "sports",
    Type: "credit",
  },
];

const ExpenseContextProvider = ({ children }) => {
  const [expenseList, setExpenseList] = useState(initialValues);
  const [editVal, setEditVal] = useState(null);

  const addExpense = (input) => {
    if (
      !input.Title ||
      !input.Description ||
      !input.Amount ||
      !input.Date ||
      !input.Category ||
      !input.Type
    ) {
      return;
    }

    if (editVal) {
      setExpenseList((prev) =>
        prev.map((expense) =>
          expense.id === editVal.id
            ? {
                ...input,
                id: editVal.id,
                Amount: Number(input.Amount),
              }
            : expense
        )
      );

      setEditVal(null);
    } else {
      const newExpense = {
        ...input,
        id: Date.now(),
        Amount: Number(input.Amount),
      };

      setExpenseList((prev) => [...prev, newExpense]);
    }
  };

  const DeleteExpense = (id) => {
    setExpenseList((prev) =>
      prev.filter((expense) => expense.id !== id)
    );
  };

  const handleEdit = (id) => {
    const expense = expenseList.find(
      (item) => item.id === id
    );

    setEditVal(expense || null);
  };

  const debit = expenseList
    .filter((p) => p.Type === "debit")
    .reduce((acc, curr) => acc + Number(curr.Amount), 0);

  const credit = expenseList
    .filter((p) => p.Type === "credit")
    .reduce((acc, curr) => acc + Number(curr.Amount), 0);

  const balance = credit - debit;

  const value = {
    expenseList,
    addExpense,
    DeleteExpense,
    editVal,
    setEditVal,
    handleEdit,
    debit,
    credit,
    balance,
  };

  return (
    <expenseContext.Provider value={value}>
      {children}
    </expenseContext.Provider>
  );
};

export default ExpenseContextProvider;
