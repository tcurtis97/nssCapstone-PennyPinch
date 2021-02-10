import React, { useContext, useEffect } from "react";
import { BudgetContext } from "./BudgetProvider";
import { BudgetCard } from "./Budget";
import { useHistory } from "react-router-dom";
import "./Budget.css";

export const BudgetList = () => {
  const { budget, getBudgets } = useContext(BudgetContext);

  useEffect(() => {
    getBudgets();
  }, []);

  const history = useHistory();

  return (
    <div className="budgets">
      <button className="budget_button"
        onClick={() => {
          history.push("/budget/create");
        }}
      >
        Add Budget
      </button>

      {budget.map((budget) => {
        return <BudgetCard key={budget.id} budget={budget} />;
      })}
    </div>
  );
};
