import React, { useContext, useEffect, useState } from "react";
import { IncomeContext } from "./IncomeProvider";
import "./Income.css";
import { useParams, useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';

export const IncomeDetail = () => {
  const { getIncomeById, deleteIncome } = useContext(IncomeContext);

  const [income, setIncomes] = useState({});

  const { incomeId } = useParams();
  const history = useHistory();

  const incomeDelete = () => {
    deleteIncome(income.id).then(() => {
      history.push("/incomes");
    });
  };

  useEffect(() => {
    console.log("useEffect", incomeId);
    getIncomeById(incomeId).then((response) => {
      setIncomes(response);
    });
  }, []);

  return (
    <section className="income">
      <h3 className="income__name">{income.name}</h3>
      <div className="income__value">{income.value}</div>
      <Button variant="primary"
        onClick={() => {
          history.push(`/incomes/edit/${income.id}`);
        }}
      >
        Edit
      </Button>
      <Button variant="primary" onClick={incomeDelete}>Delete Income</Button>
    </section>
  );
};
