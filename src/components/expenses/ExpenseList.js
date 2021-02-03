import React, { useContext, useEffect } from "react"
import {ExpenseContext } from "./ExpenseProvider"
import {ExpenseCard } from "./Expense"
import "./Expense.css"
import { CategoryContext } from "../categories/CategoryProvider"

export const ExpenseList = () => {
  const { expenses, getExpenses } = useContext(ExpenseContext)
  const { categories, getCategories } = useContext(CategoryContext)

  useEffect(() => {
    getCategories()
    .then(getExpenses)

  }, [])



  return (
    <div className="expenses">

      {
        categories.map(category => {
            const expense = expenses.filter(e => e.categoryId === category.id)
          return <ExpenseCard key={category.id} category={category} expense={expense} />
        })
      }
    </div>
  )}