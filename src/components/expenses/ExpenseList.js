import React, { useContext, useEffect, useState } from "react"
import { ExpenseContext } from "./ExpenseProvider"
import { CategoryContext } from "../categories/CategoryProvider"
import { useParams, useHistory } from "react-router-dom"
import { ExpenseCard } from "./ExpenseCard"
import { BudgetContext } from "../budget/BudgetProvider";

export const ExpenseList = () => {
    const { expenses, getExpenses } = useContext(ExpenseContext)
    const { categories, getCategories } = useContext(CategoryContext)
    const { getBudgetById } = useContext(BudgetContext);
	
	const history = useHistory();
  const { budgetId } = useParams();

  const [budget, setBudget] = useState({
    name: "",
    date: "",
    userId: 0,
    expenses:[]
  });




  
    useEffect(() => {
      getCategories()
        .then(getExpenses)
        .then(() => {
          if (budgetId) {
            getBudgetById(budgetId).then((budget) => {
              setBudget(budget);
            });
          }
        });
    }, []);



  return (
    <section className="expense">
       
       {
        budget.expenses?.map(e => {
         const expense = e.filter(ef => ef.categoryId === categories.Id)
            return <ExpenseCard key={e.id}  expense={e} budget={e.budget} category={e.category} />

        })
        }
        
    </section>
  )
}