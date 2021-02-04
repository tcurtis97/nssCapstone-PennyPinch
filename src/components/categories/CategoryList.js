// import React, { useContext, useEffect } from "react"
// import {BudgetContext } from "./BudgetProvider"
// import {BudgetCard } from "./Budget"
// import { useHistory } from "react-router-dom"
// import "./Budget.css"

// export const BudgetList = () => {
//   const { categories, getCategories } = useContext(CategoryContext)

//   useEffect(() => {
    
//     getCategories()

//   }, [])

//   const history = useHistory()


//   return (
//     <div className="categories">
//       {
//         categories.map(category => {
//           return <CategoryCard key={category.id} category={category} />
//         })
//       }
//     </div>
//   )}