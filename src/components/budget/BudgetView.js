import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { BudgetContext } from "../budget/BudgetProvider";
import { ExpenseContext } from "../expenses/ExpenseProvider";
import { CategoryContext } from "../categories/CategoryProvider";
import { CategoryCard } from "../categories/CategoryCard"

export const BudgetView = () => {
  const { expenses, getExpenses, getExpenseById } = useContext(ExpenseContext);
  const { budgets, getBudgets } = useContext(BudgetContext);
  const { category, getCategories } = useContext(CategoryContext)

  useEffect(() => {
    getBudgets().then(getExpenses).then(getCategories);
  }, []);

  const history = useHistory();



  return (
    <section className="budgetview">
      <h4 className="budget__title">{budgets.name}</h4>
      <div className="budget_date">{budgets.date}</div>
      <button
        onClick={() => {
          history.push("/expenses/create");
        }}
      >
        Add Expense
      </button>
      <h4 className="expense__title">Expenses</h4>

      <div className="catergory_cards">
        {expenses.categories?.map((c) => {
          const expense = expenses.filter(
            (e) => e.categoryId === c.id
          );
          let total = 0;
          expense.forEach((i) => {
            total += i.value;
          });
          return <CategoryCard key={c.id} category={c} total={total} />;
        })}
      </div>
    </section>
  );
};

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
