import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const IncomeContext = createContext()

// This component establishes what data can be used.
export const IncomeProvider = (props) => {
    const [incomes, setIncomes] = useState([])
    
    const getIncomes = () => {
        return fetch("http://localhost:8088/incomes")
        .then(res => res.json())
        .then(setIncomes)
    }

    const addIncome = incomeObj => {
        return fetch("http://localhost:8088/incomes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(incomeObj)
        })
        .then(getIncomes)
    }

    const getIncomeById = (id) => {
        return fetch(`http://localhost:8088/incomes/${id}`)
            .then(res => res.json())
    }
   
    const deleteIncome = incomeId => {
        return fetch(`http://localhost:8088/incomes/${incomeId}`, {
            method: "DELETE"
        })
            .then(getIncomes)
    }

    const updateIncome = income => {
        return fetch(`http://localhost:8088/income/${income.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(income)
        })
          .then(getIncomes)
      }



    return (
        <IncomeContext.Provider value={{
            incomes, getIncomes, addIncome, getIncomeById, deleteIncome, updateIncome
        }}>
            {props.children}
        </IncomeContext.Provider>
    )
}