
import { createContext, useState } from "react";

export const expenseContext = createContext();

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
    Type: "debit",
  },
];

const ExpenseContextProvider = ({ children }) => {
  const [expenseList, setExpenseList] = useState(initialValues);

  const addExpense = (input) => {
    const newExpense = {
      ...input,
      id: Date.now(),
    };

    setExpenseList((prev) => [...prev, newExpense]);
  };

  const value = {
    expenseList,
    addExpense,
  };

  return (
    <expenseContext.Provider value={value}>
      {children}
    </expenseContext.Provider>
  );
};

export default ExpenseContextProvider;
