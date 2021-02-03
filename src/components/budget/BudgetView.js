import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { BudgetContext } from "../budget/BudgetProvider"
import { ExpenseContext } from "../expenses/ExpenseProvider"

export const BudgetView = () => {
    const { expenses , getExpenses } = useContext(ExpenseContext)
    const { budgets , getBudgets } = useContext(BudgetContext)



useEffect(() => {
getExpenses()
.then(getBudgets)

}, [])



    return (
        <section className="budgetview">
        <h4 className="budget__title">{budget.name}</h4>
       <div className="budget_date" >{budget.date}</div>
       <button onClick={() => {history.push("/expenses/create")}}>
            Add Expense
          </button>
          <h4 className="expense__title">Expenses</h4>
  
          </section>
      )

      
}


// {expenses.map(expense => {
//   const housingCat = expenses.filter(e => e.categoryId === categories.id)
//   const total = (housingCat) => {
//     let totalValue = 0
//     for(const i in housingCat) {
//       totalValue += housingCat[i]
//     }
//     return totalValue
//   }
// return <ExpenseCard key={expesne.id} expense={expense}/>
// })
// }