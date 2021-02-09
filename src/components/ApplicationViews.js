import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { BudgetList } from "./budget/BudgetList";
import { BudgetProvider } from "./budget/BudgetProvider";
import { BudgetDetail } from "./budget/BudgetDetail";
import { BudgetForm } from "./budget/BudgetForm";
import { BudgetView } from "./budget/BudgetView";
import { ExpenseProvider } from "./expenses/ExpenseProvider";
import { IncomeList } from "./income/IncomeList";
import { IncomeProvider } from "./income/IncomeProvider";
import { IncomeDetail } from "./income/IncomeDetail";
import { IncomeForm } from "./income/IncomeForm";
import { CategoryProvider } from "./categories/CategoryProvider";
import { ExpenseForm } from "./expenses/ExpenseForm"
import { ExpenseList } from "./expenses/ExpenseList"

export const ApplicationViews = () => {
  return (
    
    <>
      <BudgetProvider>
        <ExpenseProvider>
          <CategoryProvider>
            <IncomeProvider>

            <Route exact path="/budget">
              <BudgetList />
            </Route>

            <Route exact path="/budget/create">
              <BudgetForm />
            </Route>

            <Route exact path="/budget/edit/:budgetId(\d+)">
              <BudgetForm />
            </Route>

            <Route exact path="/budget/detail/:budgetId(\d+)">
              <BudgetDetail />
            </Route>

            <Route exact path="/budget/view/:budgetId(\d+)">
              <BudgetView />
            </Route>

            <Route exact path="/expenses/create/:budgetId(\d+)">
              <ExpenseForm />
            </Route>
            
            
            <Route exact path="/category/detail/:categoryId(\d+)">
              <ExpenseList />
            </Route>

            <Route exact path="/expenses/edit/:expenseId(\d+)/:budgetId(\d+)">
              <ExpenseForm />
            </Route>
           

            </IncomeProvider>
          </CategoryProvider>
        </ExpenseProvider>
      </BudgetProvider>

      <IncomeProvider>
        <Route exact path="/incomes">
          <IncomeList />
        </Route>
        <Route exact path="/incomes/create">
          <IncomeForm />
        </Route>
        <Route exact path="/incomes/edit/:incomeId(\d+)">
          <IncomeForm />
        </Route>
      </IncomeProvider>

      <IncomeProvider>
        <Route exact path="/incomes/detail/:incomeId(\d+)">
          <IncomeDetail />
        </Route>
      </IncomeProvider>
      </>
   
  );
};
