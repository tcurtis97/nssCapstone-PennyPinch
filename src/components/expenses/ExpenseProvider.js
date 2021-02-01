import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const ExpenseContext = createContext()

// This component establishes what data can be used.
export const ExpenseProvider = (props) => {
    const [expenses, setExpenses] = useState([])
    
    const getExpenses = () => {
        return fetch("http://localhost:8088/expenses")
        .then(res => res.json())
        .then(setExpenses)
    }

    const addExpense = expenseObj => {
        return fetch("http://localhost:8088/expenses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(expenseObj)
        })
        .then(getExpenses)
    }

    const getExpenseById = (id) => {
        return fetch(`http://localhost:8088/expenses/${id}`)
            .then(res => res.json())
    }
   
    const deleteExpense = expenseId => {
        return fetch(`http://localhost:8088/expenses/${expenseId}`, {
            method: "DELETE"
        })
            .then(getExpenses)
    }

    const updateExpense = expense => {
        return fetch(`http://localhost:8088/expense/${expense.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(expense)
        })
          .then(getExpenses)
      }



    return (
        <ExpenseContext.Provider value={{
            expenses, getExpenses, addExpense, getExpenseById, deleteExpense, updateExpense
        }}>
            {props.children}
        </ExpenseContext.Provider>
    )
}