import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { BudgetContext } from "../budget/BudgetProvider";
import { ExpenseContext } from "../expenses/ExpenseProvider";
import { CategoryContext } from "../categories/CategoryProvider";
import { CategoryCard } from "../categories/CategoryCard";
import { ExpenseCard } from "../expenses/ExpenseCard";
import { CounterCard } from "../counter/Counter";
import { IncomeContext } from "../income/IncomeProvider"
import { ExpenseList } from "../expenses/ExpenseList"
import { Link } from "react-router-dom";
import "./BudgetView.css"

export const BudgetView = () => {
  const { expenses, getExpenses } = useContext(ExpenseContext);
  const { budgets, getBudgets, getBudgetById } = useContext(BudgetContext);
  const { categories, getCategories } = useContext(CategoryContext);
  const { incomes, getIncomes } = useContext(IncomeContext);

  
  const [budget, setBudget] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({id: 0, name: 'yeet'});

  
  const handleControlledInputChange = (event) => {
    let newCategory = { ...selectedCategory }
    let selectedId = event.target.options.selectedIndex
    let selectedName = event.target.value
    newCategory.id = selectedId
    newCategory.name = selectedName
    setSelectedCategory(newCategory)
    // takes the selected id and name of the category selected and sets these values to state
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

// adds up all incomes
  let totIncome = incomes?.reduce((prev,next) => prev + next.value,0);
  console.log(totIncome)
  // adds up all expenses
  let totExpenses = budget.expenses?.reduce((prev,next) => prev + next.value,0);
  console.log(totExpenses)
  let counterNum = totIncome - totExpenses;
  
  
  // takes the budget id out of the url and sets it to the variable budgetId to be used throughout this component
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
        // return counternum but if not return 0
       counterNum ? counterNum : 0
      }
      </div>

      <button className="addExpense">
        {/* button linked to expense form to add expenses */}
        <Link to={`/expenses/create/${budgetId}`}>Add expense</Link>
      </button>

      <h4 className="expense__title">Expenses</h4>

      <fieldset>
        <div className="form-group">
          <label htmlFor="category">Choose Category: </label>
          <select value={categories.id} id="cat_select" className="form-control" onChange={handleControlledInputChange}>
            <option value="0">Select a Category</option>
            {categories.map(c => (
              <option key={c.id} id={c.id} name={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      {/* ternary statement to say if the select has a value of 0 then run CategoryCard which will show all the categories, else run ExpenseCard which will show the expenses for that category selected */}
      {selectedCategory.id == 0 ?

      <div className="category_card">
        {categories.map((c) => {
          // filters through the expenses for this budget and gives back the expenses that match the category id
          const expense = budget.expenses?.filter((e) => e.categoryId === c.id)
          // arr.reduce(callback( accumulator, currentValue, [, index[, array]] )[, initialValue])
          let total = expense?.reduce((prev,next) => prev + next.value,0);
          
          return <CategoryCard key={c.id} category={c} total={total} />;
        })}
      </div> 
     : <ExpenseList selectedCategory={selectedCategory} /> }
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
