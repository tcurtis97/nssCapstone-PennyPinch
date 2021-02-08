import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { BudgetContext } from "../budget/BudgetProvider";
import { ExpenseContext } from "../expenses/ExpenseProvider";
import { CategoryContext } from "../categories/CategoryProvider";
import { CategoryCard } from "../categories/CategoryCard";
import { ExpenseCard } from "../expenses/ExpenseCard";
import { CounterCard } from "../counter/Counter";
import { IncomeContext } from "../income/IncomeProvider"

import { Link } from "react-router-dom";

export const BudgetView = () => {
  const { expenses, getExpenses } = useContext(ExpenseContext);
  const { budgets, getBudgets, getBudgetById } = useContext(BudgetContext);
  const { categories, getCategories } = useContext(CategoryContext);
  const { incomes, getIncomes } = useContext(IncomeContext);

  
  const [budget, setBudget] = useState([]);

  const handleControlledInputChange = (event) => {
    const newBudget = { ...budget }
    newBudget[event.target.id] = event.target.value
    setBudget(newBudget)
  }

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


  let totIncome = incomes?.reduce((prev,next) => prev + next.value,0);
  console.log(totIncome)
  let totExpenses = budget.expenses?.reduce((prev,next) => prev + next.value,0);
  console.log(totExpenses)
  
  
  const { budgetId } = useParams();
  const history = useHistory();
  console.log("YEET");
  
  return (
    <section className="budgetview">
      {console.log("yeetyeet")}
      <h4 className="budget__title">{budget.name}</h4>
      <div className="budget_date">{budget.date}</div>

      <div className="counter">
      {
       
      }
      </div>

      <button className="addExpense">
        {" "}
        <Link to={`/expense/create/${budget.id}`}>Add expense</Link>{" "}
      </button>

      <h4 className="expense__title">Expenses</h4>

      <fieldset>
        <div className="form-group">
          <label htmlFor="category">Choose Category: </label>
          <select value={categories.id} id="cat_select" className="form-control" onChange={handleControlledInputChange}>
            <option value="0">Select a Category</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      <div className="category_card">
        {categories.map((c) => {
          const expense = budget.expenses?.filter((e) => e.categoryId === c.id)
          let total = expense?.reduce((prev,next) => prev + next.value,0);
          
          return <CategoryCard key={c.id} category={c} total={total} />;
        })}
      </div>
    </section>
  );
};

/*       
  //   categories.map(c => {
  //     // const budId = budgetId
  //     const expense = budget.expenses?.filter(e => e.categoryId === c.id)
  //     const filteredExpense = expense.map(ef => {

  //     })
  //     // let total = 0
  //     // const totalExpense = expense.forEach((i) => {
  //     //   total += i.value
  //     //   return total
  //     // })
  //     return <CategoryCard key={c.id} category={c} expense={expense} />
  //   })
  // }
      <section className="category_card">
        {categories.map((c) => {
          return <CategoryCard key={c.id} category={c} />;
        })}
        <div className="expense_card">
          {expenses.map((e) => {
            const expense = expenses.filter(
              (e) => e.categoryId === categories.id
            );
            let total = 0;
            expense.forEach((i) => {
              total += i.value;
              return <ExpenseCard total={total}> </ExpenseCard>;
            });
          })}
        </div>
      </section> */

/* // {expenses.map(expense => {
//   const housingCat = expenses.filter(e => e.categoryId === categories.id)
//   const total = (housingCat) => {
//     let totalValue = 0
//     for(const i in housingCat) {
//       totalValue += housingCat[i]
//     }
//     return totalValue
//   }
// return <ExpenseCard key={expesne.id} expense={expense}/>
// })
// }



//  <div className="catergory_cards">
//         {expenses.categories?.map((c) => {
//           const expense = expenses.filter(
//             (e) => e.categoryId === c.id
//             );
//             let total = 0;
//             expense.forEach((i) => {
//               total += i.value;
//             });
//             return <CategoryCard key={c.id} category={c} total={total} />;
//           })}
//       </div> */

/* <section className="category_card">
 {categories.map(c => {
    return <CategoryCard key={c.id} category={c} />; 
  })}
  <div className="expense_card">
   {expenses.map(e => {
       const expense = expenses.filter(
        (e) => e.categoryId === categories.id
        );
        let total = 0;
        expense.forEach((i) => {
          total += i.value;
          return <ExpenseCard total={total}> </ExpenseCard>
        });
    })}
  </div>
</section> */

/* <section className= "category_card">
  {
    categories.map(c => {
      expenses.map(e =>{
        const expense = expenses.filter(e => e.categoryId === c.id)
        let total = 0
        expense.forEach.((i) => {
          total += i.value;
          return <CategoryCard key={c.id} category={c} total={total} />;
        })
      })
    })
  }
</section> */

/* <section className="category_card">
 {categories.map(c => {
    return <CategoryCard key={c.id} category={c} />; 
  })}
  <div className="expense_card">
   {expenses.map(e => {
       const expense = expenses.filter(
        (e) => e.categoryId === categories.id
        );
        let total = 0;
        expense.forEach(i => {
          total += i.value;
          return <ExpenseCard total={total}> </ExpenseCard>
        });
    })}
  </div>
</section> */
