import React, { useState, createContext } from "react"


export const ExpenseContext = createContext()


export const ExpenseProvider = (props) => {
    const [expenses, setExpenses] = useState([])
    
    const getExpenses = () => {
        return fetch("http://localhost:8088/expenses?_expand=category&_expand=budget")
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
        return fetch(`http://localhost:8088/expenses/${id}?expand=category`)
            .then(res => res.json())
    }
   
    const deleteExpense = expenseId => {
        return fetch(`http://localhost:8088/expenses/${expenseId}`, {
            method: "DELETE"
        })
            .then(getExpenses)
    }

    const updateExpense = expense => {
        return fetch(`http://localhost:8088/expenses/${expense.id}`, {
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