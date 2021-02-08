// import React, { useContext, useEffect, useState } from "react"
// import { ExpenseContext } from "./ExpenseProvider"

// import { useParams, useHistory } from "react-router-dom"



// export const ExpenseDetail = () => {
//   const { getExpenseById, deleteExpense } = useContext(ExpenseContext)

// 	const [expense, setExpenses] = useState({})

// 	const {expenseId} = useParams();
// 	const history = useHistory();

//   const expenseDelete = () => {
//     deleteExpense(expense.id)
//       .then(() => {
//         history.push("/expenses")
//       })
//   }

  
//   useEffect(() => {
//     console.log("useEffect", expenseId)
//     getExpenseById(expenseId)
//     .then((response) => {
//       setExpenses(response)
//     })
//     }, [])


//   return (
//     <section className="expense">
//         <h3 className="expense__name">{expense.name}</h3>
//         <div className="expense__value">{expense.value}</div>
        
//         <button onClick={() => {
//          history.push(`/expenses/edit/${expense.id}`)
//           }}>Edit</button>
        
//         <button onClick={expenseDelete}>Delete Expense</button>
        
//     </section>
//   )
// }