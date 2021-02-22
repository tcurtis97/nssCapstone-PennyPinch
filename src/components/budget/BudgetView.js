import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import Chart from "react-google-charts";
import { BudgetContext } from "../budget/BudgetProvider";
import { ExpenseContext } from "../expenses/ExpenseProvider";
import { CategoryContext } from "../categories/CategoryProvider";
import { CategoryCard } from "../categories/CategoryCard";
import { IncomeContext } from "../income/IncomeProvider";
import { ExpenseList } from "../expenses/ExpenseList";
import { Link } from "react-router-dom";
import "./BudgetView.css";
import PennyPinchLogo from "../images/PennyPinchLogo.png";

export const BudgetView = () => {
  const { expenses, getExpenses } = useContext(ExpenseContext);
  const { getBudgetById } = useContext(BudgetContext);
  const { categories, getCategories } = useContext(CategoryContext);
  const { incomes, getIncomes } = useContext(IncomeContext);

  const [budget, setBudget] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    id: 0,
    name: "yeet",
  });

  const handleControlledInputChange = (event) => {
    let newCategory = { ...selectedCategory };
    let selectedId = event.target.options.selectedIndex;
    let selectedName = event.target.value;
    newCategory.id = selectedId;
    newCategory.name = selectedName;
    setSelectedCategory(newCategory);
    // takes the selected id and name of the category selected and sets these values to state
  };

  useEffect(() => {
    getCategories()
      .then(getExpenses)
      .then(getIncomes)
      .then(() => {
        if (budgetId) {
          getBudgetById(budgetId).then((budget) => {
            setBudget(budget);
          });
        }
      });
  }, []);

  // adds up all incomes
  let totIncome = incomes?.reduce((prev, next) => prev + next.value, 0);
  console.log(totIncome);
  // adds up all expenses
  let totExpenses = budget.expenses?.reduce(
    (prev, next) => prev + next.value,
    0
  );
  console.log(totExpenses);
  let counterNum = totIncome - totExpenses;

  // takes the budget id out of the url and sets it to the variable budgetId to be used throughout this component
  const { budgetId } = useParams();
  const history = useHistory();

  return (
    <section className="budgetview">
      {console.log("yeetyeet")}
      <h4 className="budget__title">{budget.name}</h4>
      <div className="budget_date">
        {budget.date}, {budget.year}
      </div>
      <div className="chart_counter">
        <img
          src={PennyPinchLogo}
          width="400"
          height="400"
          alt="Logo"
          className="logo"
        ></img>
        {/* <div className="pieChart">
      <Chart
        width={"500px"}
        height={"300px"}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[
          chartData
        ]}
        options={{
          title: "Expenses",
          // Just add this option
          is3D: true,
        }}
        rootProps={{ "data-testid": "2" }}
        />
</div> */}

        <div className="counter">
          {
            // return counternum but if not return 0
            counterNum ? counterNum : 0
          }
        </div>
      </div>

      <div className="expenses_background">
        <h4 className="expense__title">Expenses</h4>

        <Button variant className="addExpense">
          {/* button linked to expense form to add expenses */}
          <Link
            to={`/expenses/create/${budgetId}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <svg
              width="66"
              height="67"
              viewBox="0 0 66 67"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_ddd)">
                <circle cx="33" cy="32" r="28" fill="#FBF5F3" />
              </g>
              <path
                d="M40 33H34V39H32V33H26V31H32V25H34V31H40V33Z"
                fill="black"
              />
              <defs>
                <filter
                  id="filter0_ddd"
                  x="0"
                  y="0"
                  width="66"
                  height="67"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  />
                  <feOffset dy="2" />
                  <feGaussianBlur stdDeviation="2" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  />
                  <feOffset dy="3" />
                  <feGaussianBlur stdDeviation="2" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="effect1_dropShadow"
                    result="effect2_dropShadow"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  />
                  <feOffset dy="1" />
                  <feGaussianBlur stdDeviation="2.5" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="effect2_dropShadow"
                    result="effect3_dropShadow"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect3_dropShadow"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>{" "}
            Add Expense
          </Link>
        </Button>

        <fieldset>
          <div className="form-group">
            <label htmlFor="category">Choose Category: </label>
            <select
              value={categories.id}
              id="cat_select"
              className="form-control"
              onChange={handleControlledInputChange}
            >
              <option value="0">Select a Category</option>
              {categories.map((c) => (
                <option key={c.id} id={c.id} name={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
        {/* ternary statement to say if the select has a value of 0 then run CategoryCard which will show all the categories, else run ExpenseCard which will show the expenses for that category selected */}
        {selectedCategory.id == 0 ? (
          <div className="category_card">
            {categories.map((c) => {
              // filters through the expenses for this budget and gives back the expenses that match the category id
              const expense = budget.expenses?.filter(
                (e) => e.categoryId === c.id
              );
              // arr.reduce(callback( accumulator, currentValue, [, index[, array]] )[, initialValue])
              let total = expense?.reduce((prev, next) => prev + next.value, 0);

              return <CategoryCard key={c.id} category={c} total={total} />;
            })}
          </div>
        ) : (
          <div className="expense_card">
            <ExpenseList selectedCategory={selectedCategory} />
          </div>
        )}
      </div>
    </section>
  );
};
