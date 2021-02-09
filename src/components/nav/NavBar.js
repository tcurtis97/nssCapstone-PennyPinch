import React from "react"
import { Link } from "react-router-dom"
import "../auth/Login"
import { Logout } from "../auth/Logout"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/budget">Budgets</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/incomes">List Of Incomes</Link>
            </li>
            
            <li className="navbar__item">
                <button onClick={Logout()}>Logout</button>
            </li>
        </ul>
    )
}