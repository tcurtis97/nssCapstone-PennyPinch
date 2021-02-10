import React, { useContext, useEffect, useState } from "react";
import { BudgetContext } from "./BudgetProvider";
import "./Budget.css";
import { useParams, useHistory } from "react-router-dom";

export const BudgetDetail = () => {
  const { getBudgetById, deleteBudget } = useContext(BudgetContext);

  const [budget, setBudgets] = useState({});

  const { budgetId } = useParams();
  const history = useHistory();

  const budgetDelete = () => {
    deleteBudget(budget.id).then(() => {
      history.push("/budget");
    });
  };

  useEffect(() => {
    console.log("useEffect", budgetId);
    getBudgetById(budgetId).then((response) => {
      setBudgets(response);
    });
  }, []);

  return (
    <section className="budget">
      <h3 className="budget__name">{budget.name}</h3>
      <div className="budget__date">{budget.date}</div>

      <button
        onClick={() => {
          history.push(`/budget/edit/${budget.id}`);
        }}
      >
        Edit
      </button>

      <button onClick={budgetDelete}>Delete Budget</button>
    </section>
  );
};
