import React from "react";
import { Link } from "react-router-dom";
import "./Budget.css";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";

export const BudgetCard = ({ budget }) => (
  <section className="budget">
    <h3 className="budget__name">
      <Link
        to={`/budget/detail/${budget.id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        {budget.name}
      </Link>
    </h3>
    <div className="budget__date">
      {budget.date}, {budget.year}
    </div>

    <Button
      className="btn-primary"
      variant="secondary"
      style={{
        color: "#FBF5F3",
        boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)",
      }}
    >
      {" "}
      <Link
        to={`/budget/view/${budget.id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        View
      </Link>{" "}
    </Button>
  </section>
);
