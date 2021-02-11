import React, { useContext, useEffect, useState } from "react";
import { BudgetContext } from "./BudgetProvider";
import "./Budget.css";
import { useParams, useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';

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

      <Button variant="primary"
        onClick={() => {
          history.push(`/budget/edit/${budget.id}`);
        }}
      >
        Edit
      </Button>

      <Button onClick={budgetDelete} variant="primary">Delete Budget</Button>
    </section>
  );
};
