import React from "react"

import { Link } from "react-router-dom"

export const CategoryCard = ({ category, total }) => (
    <section className="category">
        <h3 className="category_name">
        <Link to={`/expenses/detail/`}>
          { category.name }
        </Link>
      </h3>

<div className='total_expense'>
    {total}
</div>
    
    </section>
)