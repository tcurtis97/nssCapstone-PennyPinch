import React, { useContext, useEffect, useState } from "react"

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
      const newBudget = { ...budget }
      let selectedVal = event.target.value
      if (event.target.id.includes("Id")) {
        selectedVal = parseInt(selectedVal)
      }
     
      newBudget[event.target.id] = selectedVal
      
      setBudgets(newBudget)
    }


    const handleClickSaveBudget = () => {
          
      const name= budget.name
      const date= budget.date
      const user = localStorage.getItem("Penny_user")
      
      if (name === "" || date === "") {
        window.alert("Please enter a name and date")
      } else {

      setIsLoading(true);
         
          if (budgetId){
            //PUT - update
            updateBudget({
                id: budget.id,
                name: budget.name,
                date: budget.date,
                userId : user
            })
            .then(() => history.push(`/budgets/detail/${budget.id}`))
          }else {
            //POST - add
            addBudget({
                name: budget.name,
                date : budget.date,
                userId : user
            })
            .then(() => history.push("/budgets"))
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
                <label htmlFor="date">Budget Month:</label>
                <input type="text" id="date" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Budget Month" value={budget.date}/>
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












