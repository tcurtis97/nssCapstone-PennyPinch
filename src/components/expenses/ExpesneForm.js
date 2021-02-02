import React, { useContext, useEffect, useState } from "react"

import { ExpenseContext } from "../expense/ExpenseProvider"

import { useHistory, useParams } from 'react-router-dom';



export const ExpenseForm = () => {
    const { addExpense, getExpenseById, updateExpense, getExpenses } = useContext(ExpenseContext)

   

    const [expense, setExpenses] = useState({
      name: "",
      date: "",
    });


    const [isLoading, setIsLoading] = useState(true);

    const history = useHistory();
    const { expenseId } = useParams();
    
    const handleControlledInputChange = (event) => {
      const newExpense = { ...expense }
      let selectedVal = event.target.value
      if (event.target.id.includes("Id")) {
        selectedVal = parseInt(selectedVal)
      }
     
      newExpense[event.target.id] = selectedVal
      
      setExpenses(newExpense)
    }


    const handleClickSaveExpense = () => {
          
      const name= expense.name
      const value= expense.value
      const category= expense.categoryId
      const user = localStorage.getItem("Penny_user")
      
      if (name === "" || value === "" || category === 0) {
        window.alert("Please enter a name and value and choose a category")
      } else {

      setIsLoading(true);
         
          if (expenseId){
            //PUT - update
            updateExpense({
                id: expense.id,
                name: expense.name,
                value: expense.value,
                categoryId: category,
                userId : user
            })
            .then(() => history.push(`/expenses/detail/${expense.id}`))
          }else {
            //POST - add
            addExpense({
                name: expense.name,
                value: expense.value,
                categoryId: category,
                userId : user
            })
            .then(() => history.push("/expenses"))
          }
        }
      }
      
    
    useEffect(() => {
        getExpenses().then(() => {
            if (expenseId) {
              getExpenseById(expenseId)
              .then(expense => {
                  setExpenses(expense)
                  setIsLoading(false)
              })
            } else {
              setIsLoading(false)
            }
          })
        }, [])

   

    return (
        <form className="expenseForm">
        <h2 className="expenseForm__title">{expenseId ? "Save Expense" : "Add Expense"}</h2>
        
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Expense name:</label>
                <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Expense name" value={expense.name}/>
            </div>
        </fieldset>

        <fieldset>
        <div className="form-group">
                <label htmlFor="value">Value:</label>
                <input type="text" id="value" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Income Value" value={expense.value}/>
            </div>
        </fieldset>

        <button className="btn btn-primary"
        disabled={isLoading}
        onClick={event => {
          event.preventDefault() 
          handleClickSaveExpense()
        }}>
      {expenseId ? "Save Expense" : "Add Expense"}</button>
      </form>
    )
    }




