import React, { useContext, useEffect } from "react";
import { IncomeContext } from "./IncomeProvider";
import { IncomeCard } from "./Income";
import "./Income.css";
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';

export const IncomeList = () => {
  const { incomes, getIncomes } = useContext(IncomeContext);

  useEffect(() => {
    getIncomes();
  }, []);

  const history = useHistory();

  return (
    <div className="incomes">
      <Button variant="primary"
        onClick={() => {
          history.push("/incomes/create");
        }}
      >
        Add Income
      </Button>

      {incomes.map((income) => {
        return <IncomeCard key={income.id} income={income} />;
      })}
    </div>
  );
};
