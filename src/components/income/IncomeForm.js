import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { IncomeContext } from "../income/IncomeProvider";
import "./Income.css";
import { useHistory, useParams } from "react-router-dom";

export const IncomeForm = () => {
  const { addIncome, getIncomeById, updateIncome, getIncomes } = useContext(
    IncomeContext
  );

  const [income, setIncomes] = useState({
    name: "",
    value: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();
  const { incomeId } = useParams();

  const handleControlledInputChange = (event) => {
    const newIncome = { ...income };
    let selectedVal = event.target.value;
    if (event.target.id.includes("Id")) {
      selectedVal = parseInt(selectedVal);
    }

    newIncome[event.target.id] = selectedVal;

    setIncomes(newIncome);
  };

  const handleClickSaveIncome = () => {
    const name = income.name;
    const value = income.value;
    const user = localStorage.getItem("Penny_user");

    if (name === "" || value === 0) {
      window.alert("Please enter a name and value");
    } else {
      setIsLoading(true);

      if (incomeId) {
        updateIncome({
          id: income.id,
          name: income.name,
          value: parseInt(income.value),
          userId: parseInt(user),
        }).then(() => history.push("/incomes"));
      } else {
        //POST - add
        addIncome({
          name: income.name,
          value: parseInt(income.value),
          userId: parseInt(user),
        }).then(() => history.push("/incomes"));
      }
    }
  };

  useEffect(() => {
    getIncomes().then(() => {
      if (incomeId) {
        getIncomeById(incomeId).then((income) => {
          setIncomes(income);
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <form className="incomeForm">
      <h2 className="incomeForm__title">
        {incomeId ? "Save Income" : "Add Income"}
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
            <label htmlFor="name">Income name:</label>
            <input
              type="text"
              id="name"
              onChange={handleControlledInputChange}
              required
              autoFocus
              className="form-control"
              placeholder="Income name"
              value={income.name}
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
              placeholder="Income Value"
              value={income.value}
            />
          </div>
        </fieldset>
        <Button
          style={{
            color: "black",
            boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)",
          }}
          variant="secondary"
          className="add_button"
          disabled={isLoading}
          onClick={(event) => {
            event.preventDefault();
            handleClickSaveIncome();
          }}
        >
          {incomeId ? "Save Income" : "Add Income"}
        </Button>
      </div>
    </form>
  );
};
