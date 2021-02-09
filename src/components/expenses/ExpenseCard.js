import React, { useContext, useParams, useEffect } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { ExpenseContext } from "./ExpenseProvider"

export const ExpenseCard = ({ expense, category, budgetParam}) => {
  const { deleteExpense } = useContext(ExpenseContext)  
  
  
	const history = useHistory();

  const expenseDelete = () => {
    deleteExpense(expense.id)
      .then(() => {
        history.go(0)
      })
  }

  

   return (
    <section className="expense_card">
      <h5 className="categoryName">
        {category.name}
      </h5>
        <h3 className="expense_total">
        {expense.name}       
      </h3>
      <div className="expense_value">
        {expense.value}
      </div>

      <button className='edit'> <Link to={`/expenses/edit/${expense.id}/${budgetParam}`}>Edit</Link> </button>
      <button onClick={expenseDelete}>Delete Expense</button>
    </section>
)}