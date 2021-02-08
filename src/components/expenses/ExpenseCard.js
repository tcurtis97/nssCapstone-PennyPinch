import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { ExpenseContext } from "./ExpenseProvider"

export const ExpenseCard = ({ e }) => {
  const { deleteExpense } = useContext(ExpenseContext)  

	const history = useHistory();

  const expenseDelete = () => {
    deleteExpense(e.id)
      .then(() => {
        history.push("/expenses")
      })
  }


   return (
    <section className="expense_card">
        <h3 className="expense_total">
        {e.name}       
      </h3>
      <div className="expense_value">

      </div>

      <button className='edit'> <Link to={`/expense/edit/${e.id}`}>Edit</Link> </button>
      <button onClick={expenseDelete}>Delete Expense</button>
    </section>
)}