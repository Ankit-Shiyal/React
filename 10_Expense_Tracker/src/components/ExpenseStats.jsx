import React, { useContext } from 'react'
import { expenseContext } from '../context/ExpenseContext'

const ExpenseStats = () => {


    const { balance, credit, debit } = useContext(expenseContext)

    return (
        <>
            <div>
                <h2>Credit : {credit}</h2>
                <h2>debit : {debit}</h2>
                <h2>Balance : {balance}</h2>
            </div>
        </>
    )
}

export default ExpenseStats