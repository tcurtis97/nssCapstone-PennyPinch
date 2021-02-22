import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { ExpenseContext } from "../expenses/ExpenseProvider";
import { CategoryContext } from "../categories/CategoryProvider";
import { useHistory, useParams } from "react-router-dom";
import "./Expense.css";

export const ExpenseForm = () => {
  const { addExpense, getExpenseById, updateExpense, getExpenses } = useContext(
    ExpenseContext
  );
  const { categories, getCategories } = useContext(CategoryContext);

  const [expense, setExpenses] = useState({
    name: "",
    date: "",
    categoryId: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();
  const { expenseId } = useParams();
  const { budgetId } = useParams();

  const handleControlledInputChange = (event) => {
    const newExpense = { ...expense };
    let selectedVal = event.target.value;
    if (event.target.id.includes("Id")) {
      selectedVal = parseInt(selectedVal);
    }

    newExpense[event.target.id] = selectedVal;

    setExpenses(newExpense);
  };

  const handleClickSaveExpense = () => {
    const user = localStorage.getItem("Penny_user");

    if (
      expense.name === "" ||
      expense.value === "" ||
      expense.categoryId === 0
    ) {
      window.alert("Please enter a name and value and choose a category");
    } else {
      setIsLoading(true);

      if (expenseId) {
        updateExpense({
          id: expense.id,
          name: expense.name,
          value: parseInt(expense.value),
          categoryId: expense.categoryId,
          budgetId: parseInt(budgetId),
          userId: parseInt(user),
        }).then(() => history.push(`/budget/view/${budgetId}`));
      } else {
        addExpense({
          name: expense.name,
          value: parseInt(expense.value),
          categoryId: expense.categoryId,
          budgetId: parseInt(budgetId),
          userId: parseInt(user),
        }).then(() => history.push(`/budget/view/${budgetId}`));
      }
    }
  };

  useEffect(() => {
    getExpenses()
      .then(getCategories)
      .then(() => {
        if (expenseId) {
          getExpenseById(expenseId).then((expense) => {
            setExpenses(expense);
            setIsLoading(false);
          });
        } else {
          setIsLoading(false);
        }
      });
  }, []);

  return (
    <form className="expenseForm">
      <h2 className="expenseForm__title">
        {expenseId ? "Save Expense" : "Add Expense"}
      </h2>

      <Button
        variant
        className="back_button"
        onClick={() => {
          history.goBack();
        }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z"
            fill="#E28413"
          />
          <path
            d="M31 24H17"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M24 31L17 24L24 17"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Button>

      <div className="form_background">
        <fieldset>
          <div className="form-group">
            <label htmlFor="name">Expense name:</label>
            <input
              type="text"
              id="name"
              onChange={handleControlledInputChange}
              required
              autoFocus
              className="form-control"
              placeholder="Expense name"
              value={expense.name}
            />
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <label htmlFor="value">Value:</label>
            <input
              type="number"
              id="value"
              onChange={handleControlledInputChange}
              required
              autoFocus
              className="form-control"
              placeholder="Expense Value"
              value={expense.value}
            />
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <label htmlFor="category">Assign to Category: </label>
            <select
              value={expense.categoryId}
              id="categoryId"
              className="form-control"
              onChange={handleControlledInputChange}
            >
              <option value="0">Select a Category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </fieldset>

        <Button
          variant="secondary"
          style={{
            color: "black",
            boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)",
          }}
          className="add_button"
          disabled={isLoading}
          onClick={(event) => {
            event.preventDefault();
            handleClickSaveExpense();
          }}
        >
          {expenseId ? "Save Expense" : "Add Expense"}
        </Button>
      </div>
    </form>
  );
};
