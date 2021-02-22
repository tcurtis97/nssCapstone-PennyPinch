import React, { useContext, useEffect, useState } from "react";
import "./Budget.css";
import { BudgetContext } from "../budget/BudgetProvider";
import { useHistory, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';

export const BudgetForm = () => {
  const { addBudget, getBudgetById, updateBudget, getBudgets } = useContext(
    BudgetContext
  );

  const [budget, setBudgets] = useState({
    name: "",
    date: "",
    year: ""
  });

  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();
  const { budgetId } = useParams();

  const handleControlledInputChange = (event) => {
    let newBudget = { ...budget };
    let selectedVal = event.target.value;
    newBudget[event.target.id] = selectedVal;

    setBudgets(newBudget);
  };

  const handleClickSaveBudget = () => {
    const name = budget.name;
    const date= budget.month;
    const user = localStorage.getItem("Penny_user");
    const year = new Date().getFullYear()
    const nonChangeableYear = budget.year

    if (name === "" || date === "") {
      window.alert("Please enter a name and date");
    } else {
      setIsLoading(true);

      if (budgetId) {
        updateBudget({
          id: budget.id,
          name: budget.name,
          date: date,
          year: nonChangeableYear,
          userId: parseInt(user),
        }).then(() => history.push("/budget"));
      } else {
        addBudget({
          name: budget.name,
          date: date,
          year: year,
          userId: parseInt(user),
        }).then(() => history.push("/budget"));
      }
    }
  };

  useEffect(() => {
    getBudgets().then(() => {
      if (budgetId) {
        getBudgetById(budgetId).then((budget) => {
          setBudgets(budget);
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    });
  }, []);


 const monthMap = [
  { id: 1, month: "January" },
  { id: 2, month: "February" },
  { id: 3, month: "March" },
  { id: 4, month: "April" },
  { id: 5, month: "May" },
  { id: 6, month: "June" },
  { id: 7, month: "July" },
  { id: 8, month: "August" },
  { id: 9, month: "September" },
  { id: 10, month: "October" },
  { id: 11, month: "November" },
  { id: 12, month: "December" },
]; 

  
  return (
    <form className="budgetForm">
      <h2 className="budgetForm__title">
        {budgetId ? "Save Budget" : "Add Budget"}
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
          <label htmlFor="name">Budget name:</label>
          <input
            type="text"
            id="name"
            onChange={handleControlledInputChange}
            required
            autoFocus
            className="form-control"
            placeholder="Budget name"
            value={budget.name}
            />
        </div>
      </fieldset>

       <fieldset>
         <div className="form-group">
           <label htmlFor="category">Assign to Date: </label>
           <select
            value={budget.month}
            id="month"
            className="form-control"
            onChange={handleControlledInputChange}
            >
            <option value="0">Select a Date</option>

            {monthMap.map((m) => (
              <option key={m.id} value={m.month}>
                {m.month}
              </option>
            ))}
          </select>
        </div>
      </fieldset> 

  

      <Button variant="secondary" style={{color:"black", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)"}} 
        className="add_button"
        disabled={isLoading}
        onClick={(event) => {
          event.preventDefault();
          handleClickSaveBudget();
        }}
        >
        {budgetId ? "Save Budget" : "Add Budget"}
      </Button>

      </div>
    </form>
  );
};

