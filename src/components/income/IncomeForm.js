import React, { useContext, useEffect, useState } from "react"

import { IncomeContext } from "../income/IncomeProvider"
import "./Income.css"
import { useHistory, useParams } from 'react-router-dom';

export const IncomeForm = () => {
    const { addIncome, getIncomeById, updateIncome, getIncomes } = useContext(IncomeContext)

   

    const [income, setIncomes] = useState({
      name: "",
      value: "",
    });


    const [isLoading, setIsLoading] = useState(true);

    const history = useHistory();
    const { incomeId } = useParams();
    
    const handleControlledInputChange = (event) => {
      const newIncome = { ...income }
      let selectedVal = event.target.value
      if (event.target.id.includes("Id")) {
        selectedVal = parseInt(selectedVal)
      }
     
      newIncome[event.target.id] = selectedVal
      
      setIncomes(newIncome)
    }


    const handleClickSaveIncome = () => {
          
      const name = income.name
      const value = income.value
      const user = localStorage.getItem("Penny_user")

      if (name === "" || value === 0) {
        window.alert("Please enter a name and value")
      } else {
      
      setIsLoading(true);
         
          if (incomeId){
            updateIncome({
                id: income.id,
                name: income.name,
                value: income.value,
                userId : user
            })
            .then(() => history.push(`/incomes/detail/${income.id}`))
          }else {
            //POST - add
            addIncome({
                name: income.name,
                value : income.value,
                userId : user
            })
            .then(() => history.push("/incomes"))
          }
        }
    }
    
    useEffect(() => {
        getIncomes().then(() => {
            if (incomeId) {
              getIncomeById(incomeId)
              .then(income => {
                  setIncomes(income)
                  setIsLoading(false)
              })
            } else {
              setIsLoading(false)
            }
          })
        }, [])

   

    return (
        <form className="incomeForm">
        <h2 className="incomeForm__title">{incomeId ? "Save Income" : "Add Income"}</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Income name:</label>
                <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Income name" value={income.name}/>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="value">Value:</label>
                <input type="text" id="value" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Income Value" value={income.value}/>
            </div>
        </fieldset>
        <button className="btn btn-primary"
        disabled={isLoading}
        onClick={event => {
          event.preventDefault() 
          handleClickSaveIncome()
        }}>
      {incomeId ? "Save Income" : "Add Income"}</button>
      </form>
    )
      }