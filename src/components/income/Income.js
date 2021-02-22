import React from "react";
import "./Income.css";
import { Link } from "react-router-dom";

export const IncomeCard = ({ income }) => (
  <section className="income">
    <h3 className="income__name">
      <Link
        to={`/incomes/detail/${income.id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        {income.name}
      </Link>
    </h3>
    <div className="income__value">${income.value}</div>
  </section>
);
