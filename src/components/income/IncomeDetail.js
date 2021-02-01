import React, { useContext, useEffect, useState } from "react"
import { IncomeContext } from "./IncomeProvider"
import "./Income.css"
import { useParams, useHistory } from "react-router-dom"



export const IncomeDetail = () => {
  const { getIncomeById, deleteIncome } = useContext(IncomeContext)

	const [income, setIncomes] = useState({})

	const {incomeId} = useParams();
	const history = useHistory();

  const incomeDelete = () => {
    deleteIncome(income.id)
      .then(() => {
        history.push("/incomes")
      })
  }

  useEffect(() => {
    console.log("useEffect", incomeId)
    getIncomeById(incomeId)
    .then((response) => {
      setIncomes(response)
    })
    }, [])

  return (
    <section className="income">
        <h3 className="income__name">{income.name}</h3>
        <div className="income__value">{income.value}</div>
        <button onClick={() => {
    history.push(`/incomes/edit/${income.id}`)
}}>Edit</button>
        <button onClick={incomeDelete}>Delete Income</button>
    </section>
  )
}