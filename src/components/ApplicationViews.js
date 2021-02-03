import React from "react"
import { Route } from "react-router-dom"
import { BudgetList } from "./budget/BudgetList"
import { BudgetProvider } from "./budget/BudgetProvider"
import { BudgetDetail } from "./budget/BudgetDetail"
import { BudgetForm } from "./budget/BudgetForm"
// import  { BudgetView } from "./budget/BudgetView"

import { IncomeList } from "./income/IncomeList"
import { IncomeProvider } from "./income/IncomeProvider"
import { IncomeDetail } from "./income/IncomeDetail"
import { IncomeForm } from "./income/IncomeForm"


export const ApplicationViews = () => {
    return ( 
        <>
            <BudgetProvider>
              <Route exact path="/">
                <BudgetList />
              </Route>
              
              <Route exact path="/budgets/create">
                <BudgetForm />
              </Route>

              <Route exact path="/budgets/edit/:budgetId(\d+)">
                <BudgetForm />
              </Route>
{/*               
             <Route exact path="/budgets/view/:budgetId(\d+)">
                <BudgetView />
              </Route>  */}
            </BudgetProvider> 

             
             
             <BudgetProvider>
              <Route exact path="/budgets/detail/:budgetId(\d+)">
                <BudgetDetail />
              </Route>
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
    )
}