import React from "react";
import { ExpenseContext } from "../expenses/ExpenseProvider";
import { Link } from "react-router-dom";

export const CategoryCard = ({ category, total }) => {
  return (

  <section className="category">
    <h3 className="category_name">
      {category.name}
    </h3>

    <div className="total_expense">
    {total}
    </div>

  </section>
  )};
