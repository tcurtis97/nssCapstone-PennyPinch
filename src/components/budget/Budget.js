import React from "react"
import { Link } from "react-router-dom"
import "./Budget.css"

export const BudgetCard = ({budget}) => (
    <section className="budget">
        <h3 className="budget__name">
        <Link to={`/budgets/detail/${budget.id}`}>
          { budget.name }
        </Link>
      </h3>
        <div className="budget__date">{budget.date}</div>
    </section>
)