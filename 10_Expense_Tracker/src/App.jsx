
import { useContext } from "react";
import { expenseContext } from "./context/ExpenseContext.jsx";
import Add from "./components/Add.jsx";
import ListExpense from "./components/ListExpense.jsx";
import ExpenseStats from "./components/ExpenseStats.jsx";

const App = () => {
  const { expenseList, addExpense } = useContext(expenseContext);

  const handleAdd = (input) => {
    addExpense(input);
  };


  
  return (
    <>
      <Add handleAdd={handleAdd} />
      <br />
      <br />
      <ExpenseStats/>
      <br /><br />
      <ListExpense expenseList={expenseList} />
    </>
  );
};

export default App;
