import React, { useContext, useEffect } from "react"
import {BudgetContext } from "./BudgetProvider"
import {BudgetCard } from "./Budget"
import { useHistory } from "react-router-dom"
import "./Budget.css"

export const BudgetList = () => {
  const { budgets, getBudgets } = useContext(BudgetContext)

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