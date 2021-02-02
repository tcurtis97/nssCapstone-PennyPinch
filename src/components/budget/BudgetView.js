import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { BudgetContext } from "../budget/BudgetProvider"
import { ExpenseContext } from "../expenses/ExpenseProvider"

export const BudgetView = () => {
    const { addExpense, getExpenseById, updateExpense, getExpenses } = useContext(ExpenseContext)
    const { addBudget, getBudgetById, updateBudget, getBudgets } = useContext(BudgetContext)



useEffect(() => {
getExpenses().then(getBudgets())

}, [])



    return (
        <section className="budgetview">
        <h4 className="budget__title">{budget.name}</h4>
       <div className="budget_date" >{budget.date}</div>
       <button onClick={() => {history.push("/expenses/create")}}>
            Add Expense
          </button>
          <h4 className="expense__title">Expenses</h4>
          <div className = "housing_cat"></div>
          <div className = "transportation_cat"></div>
          <div className = "food_cat"></div>
          <div className = "life/health_cat"></div>
          <div className = "personal_cat"></div>
          <div className = "debt_cat"></div>
          <div className = "saving_cat"></div>
          <div className = "giving_cat"></div>
          </section>
      )

      
}