import React, { useContext, useEffect, useState } from "react";
import { ExpenseContext } from "./ExpenseProvider";
import { CategoryContext } from "../categories/CategoryProvider";
import { useParams, useHistory } from "react-router-dom";
import { ExpenseCard } from "./ExpenseCard";
import { BudgetContext } from "../budget/BudgetProvider";
import "./Expense.css";

export const ExpenseList = ({ selectedCategory }) => {
  const { expenses, getExpenses } = useContext(ExpenseContext);
  const { categories, getCategories } = useContext(CategoryContext);
  const { getBudgetById } = useContext(BudgetContext);

  const history = useHistory();
  const { budgetId } = useParams();

  const [budget, setBudget] = useState({});

  let thing = budget.expenses?.filter(
    (e) => e.categoryId == selectedCategory.id
  );
  console.log(thing);

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
      {thing?.map((e) => {
        return (
          <ExpenseCard
            key={e.id}
            expense={e}
            category={selectedCategory}
            budgetParam={budgetId}
          />
        );
      })}
    </section>
  );
};
