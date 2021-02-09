import React, { useContext, useEffect, useState } from "react"

import { ExpenseContext } from "../expenses/ExpenseProvider"
import { CategoryContext } from "../categories/CategoryProvider";
import { useHistory, useParams } from 'react-router-dom';



export const ExpenseForm = () => {
    const { addExpense, getExpenseById, updateExpense, getExpenses } = useContext(ExpenseContext)
    const { categories, getCategories } = useContext(CategoryContext)
   

    const [expense, setExpenses] = useState({
      name: "",
      date: "",
      categoryId: 0
    });


    const [isLoading, setIsLoading] = useState(true);

    const history = useHistory();
    const { expenseId } = useParams();
    const { budgetId } = useParams();
    
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
          
      const user = localStorage.getItem("Penny_user")
      
      if (expense.name === "" || expense.value === "" || expense.categoryId === 0) {
        window.alert("Please enter a name and value and choose a category")
      } else {

      setIsLoading(true);
         
          if (expenseId){
  
            updateExpense({
                id: expense.id,
                name: expense.name,
                value: parseInt(expense.value),
                categoryId: expense.categoryId,
                budgetId : parseInt(budgetId), 
                userId : parseInt(user)
            })
            .then(() => history.push(`/budget/view/${budgetId}`))
          }else {
           
            addExpense({
                name: expense.name,
                value: parseInt(expense.value),
                categoryId: expense.categoryId,
                budgetId: parseInt(budgetId),
                userId : parseInt(user)
                
            })
            .then(() => history.push(`/budget/view/${budgetId}`))
          }
        }
      }
      
    
    useEffect(() => {
        getExpenses().then(getCategories).then(() => {
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
                <input type="text" id="value" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Expense Value" value={expense.value}/>
            </div>
        </fieldset>

        <fieldset>
        <div className="form-group">
          <label htmlFor="category">Assign to Category: </label>
          <select value={expense.categoryId} id="categoryId" className="form-control" onChange={handleControlledInputChange}>
            <option value="0">Select a Category</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
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




