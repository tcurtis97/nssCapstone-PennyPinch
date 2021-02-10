import React from "react";
import { Link } from "react-router-dom";
import "./Budget.css";
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';

export const BudgetCard = ({ budget }) => (
  

  <section className="budget">
    <h3 className="budget__name">
      <Link to={`/budget/detail/${budget.id}`}>{budget.name}</Link>
    </h3>
    <div className="budget__date">{budget.date}, {budget.year}</div>
    

    <Button className="view">
      {" "}
      <Link to={`/budget/view/${budget.id}`}>View</Link>{" "}
    </Button>
  </section>
);
