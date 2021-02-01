import React from "react"
import { Link } from "react-router-dom"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Budgets</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/incomes">IncomeList</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/"></Link>
            </li>
        </ul>
    )
}