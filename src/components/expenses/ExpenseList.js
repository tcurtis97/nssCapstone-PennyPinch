// import React, { useContext, useEffect } from "react"
// import {ExpenseContext } from "./ExpenseProvider"
// import {ExpenseCard } from "./Expense"
// import "./Expense.css"
// import { CategoryContext } from "../categories/CategoryProvider"

// export const ExpenseList = () => {
//   const { expenses, getExpenses } = useContext(ExpenseContext)
//   const { categories, getCategories } = useContext(CategoryContext)
//   useEffect(() => {
//     getExpenses().then(getCategories)

//   }, [])



//   return (
//     <div className="expenses">

//       {
//         expenses.map(expense => {
//             const expense = expenses.map(expense => expense.categoryId === expenses.category.id)
//           return <ExpenseCard key={category.id} category={category} expense={} />
//         })
//       }
//     </div>


// // const total = (expense) => {
// //   let totalValue = 0
// //   for(const i in expense) {
// //     totalValue += housingCat[i]
// //   }
// //   return totalValue
// // }