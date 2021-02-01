import React, { useContext, useEffect } from "react"
import {BudgetContext } from "./BudgetProvider"
import {BudgetCard } from "./Budget"
import { useHistory } from "react-router-dom"

export const BudgetList = () => {
  // This state changes when `getAnimals()` is invoked below
  const { budgets, getBudgets } = useContext(BudgetContext)

  //useEffect - reach out to the world for something
  useEffect(() => {
    
    getBudgets()

  }, [])

  const history = useHistory()


  return (
    <div className="budgets">
      <button onClick={() => {history.push("/budgets/create")}}>
            Add Budget
          </button>

      {
        budgets.map(budget => {
          return <BudgetCard key={budget.id} budget={budget} />
        })
      }
    </div>
  )}