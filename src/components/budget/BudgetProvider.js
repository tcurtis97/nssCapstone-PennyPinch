import React, { useState, createContext } from "react";

export const BudgetContext = createContext();

export const BudgetProvider = (props) => {
  const [budget, setBudgets] = useState([]);
  const user = localStorage.getItem("Penny_user");

  const getBudgets = () => {
    return fetch(`http://localhost:8088/budgets?userId=${user}&_embed=expenses`)
      .then((res) => res.json())
      .then(setBudgets);
  };

  const addBudget = (budgetObj) => {
    return fetch("http://localhost:8088/budgets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(budgetObj),
    }).then(getBudgets);
  };

  const getBudgetById = (id) => {
    return fetch(
      `http://localhost:8088/budgets/${id}?_embed=expenses`
    ).then((res) => res.json());
  };

  const deleteBudget = (budgetId) => {
    return fetch(`http://localhost:8088/budgets/${budgetId}`, {
      method: "DELETE",
    }).then(getBudgets);
  };

  const updateBudget = (budget) => {
    return fetch(`http://localhost:8088/budgets/${budget.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(budget),
    }).then(getBudgets);
  };

  return (
    <BudgetContext.Provider
      value={{
        budget,
        getBudgets,
        addBudget,
        getBudgetById,
        deleteBudget,
        updateBudget,
      }}
    >
      {props.children}
    </BudgetContext.Provider>
  );
};
