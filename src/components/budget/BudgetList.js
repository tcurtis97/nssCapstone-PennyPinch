import React, { useContext, useEffect } from "react";
import { BudgetContext } from "./BudgetProvider";
import { BudgetCard } from "./Budget";
import { useHistory } from "react-router-dom";
import "./Budget.css";
import Button from "react-bootstrap/Button";
import PennyPinchLogo from "../images/PennyPinchLogo.png";

export const BudgetList = () => {
  const { budget, getBudgets } = useContext(BudgetContext);

  useEffect(() => {
    getBudgets();
  }, []);

  const history = useHistory();

  return (
    <div className="budgets">
      <div className="btn_logo">
        <Button
          variant
          className="budget_button"
          onClick={() => {
            history.push("/budget/create");
          }}
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
          Add Budget
        </Button>

        <img
          src={PennyPinchLogo}
          width="300"
          height="300"
          alt="Logo"
          className="logo"
        ></img>
      </div>

      <div className="budget_cards">
        {budget.map((budget) => {
          return <BudgetCard key={budget.id} budget={budget} />;
        })}
      </div>
    </div>
  );
};
