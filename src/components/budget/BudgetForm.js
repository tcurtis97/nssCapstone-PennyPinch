import React, { useContext, useEffect, useState } from "react"
import "./Budget.css"
import { BudgetContext } from "../budget/BudgetProvider"

import { useHistory, useParams } from 'react-router-dom';
import Picker from 'react-month-picker'


export const BudgetForm = () => {
    const { addBudget, getBudgetById, updateBudget, getBudgets } = useContext(BudgetContext)

   

    const [budget, setBudgets] = useState({
      name: "",
      date: "",
    });


    const [isLoading, setIsLoading] = useState(true);

    const history = useHistory();
    const { budgetId } = useParams();
    
    const handleControlledInputChange = (event) => {
      let newBudget = { ...budget }
      let selectedVal = event.target.value
      newBudget[event.target.id] = selectedVal
      
      setBudgets(newBudget)
    }


    const handleClickSaveBudget = () => {
          
      const name= budget.name
      const date= budget.month
      const user = localStorage.getItem("Penny_user")
      
      if (name === "" || date === "") {
        window.alert("Please enter a name and date")
      } else {

      setIsLoading(true);
         
          if (budgetId){
           
            updateBudget({
                id: budget.id,
                name: budget.name,
                date: date,
                userId : parseInt(user)
            })
            .then(() => history.push(`/budget/detail/${budget.id}`))
          }else {
            
            addBudget({
                name: budget.name,
                date : date,
                userId : parseInt(user)
            })
            .then(() => history.push("/budget"))
          }
        }
      }
      
    
    useEffect(() => {
        getBudgets().then(() => {
            if (budgetId) {
              getBudgetById(budgetId)
              .then(budget => {
                  setBudgets(budget)
                  setIsLoading(false)
              })
            } else {
              setIsLoading(false)
            }
          })
        }, [])

      const monthMap = [{id: 1, month: 'January'}, {id: 2, month: 'February'},{id: 3, month: 'March'},{id: 4, month: 'April'},{id: 5, month: 'May'},{id: 6, month: 'June'},{id: 7, month: 'July'},{id: 8, month: 'August'},{id: 9, month: 'September'},{id: 10, month: 'October'},{id: 11, month: 'November'},{id: 12, month: 'December'}];

    return (
        <form className="budgetForm">
        <h2 className="budgetForm__title">{budgetId ? "Save Budget" : "Add Budget"}</h2>
        
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Budget name:</label>
                <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Budget name" value={budget.name}/>
            </div>
        </fieldset>

        
        <fieldset>
        <div className="form-group">
          <label htmlFor="category">Assign to Date: </label>
          <select value={budget.month} id="month" className="form-control" onChange={handleControlledInputChange}>
            <option value="0" >Select a Date</option>
            
            {monthMap.map(m => (
              <option key={m.id} value={m.month}>
                {m.month}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

        <button className="btn btn-primary"
        disabled={isLoading}
        onClick={event => {
          event.preventDefault() 
          handleClickSaveBudget()
        }}>
      {budgetId ? "Save Budget" : "Add Budget"}</button>
      </form>
    )
    }




    







