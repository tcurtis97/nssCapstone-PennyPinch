import React, { useContext, useParams, useEffect } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { ExpenseContext } from "./ExpenseProvider"
import Button from 'react-bootstrap/Button';
import "./Expense.css";

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
    <section className="expense">
      <h5 className="categoryName">
        {category.name}
      </h5>
        <h3 className="expense_total">
        {expense.name}       
      </h3>
      <div className="expense_value">
        ${expense.value}
      </div>

      <Button variant="secondary" style={{color:"black", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)"}} className="btn-primary"> <Link to={`/expenses/edit/${expense.id}/${budgetParam}`} style={{ textDecoration: 'none', color: 'black' }}>Edit</Link> </Button>
      <Button variant="secondary" onClick={expenseDelete} style={{color:"black", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)"}} className="btn-primary">Delete Expense</Button>
    </section>
)}