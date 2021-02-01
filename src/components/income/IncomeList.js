import React, { useContext, useEffect } from "react"
import {IncomeContext } from "./IncomeProvider"
import {IncomeCard } from "./Income"
import "./Income.css"
import { useHistory } from "react-router-dom"


export const IncomeList = () => {
  // This state changes when `getAnimals()` is invoked below
  const { incomes, getIncomes } = useContext(IncomeContext)

  //useEffect - reach out to the world for something
  useEffect(() => {
    
    getIncomes()

  }, [])

  const history = useHistory()


  return (
    <div className="incomes">
      <button onClick={() => {history.push("/incomes/create")}}>
            Add Income
          </button>

      {
        incomes.map(income => {
          return <IncomeCard key={income.id} income={income} />
        })
      }
    </div>
  )
}