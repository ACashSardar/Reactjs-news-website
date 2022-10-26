import React from 'react'
import { Link } from 'react-router-dom'

const Category = ({category,setCategory,setChannel}) => {
  return (
    <li className="nav-item">
        <Link className="nav-link" to="/category" onClick={()=>{if(category!=="Weather"){setCategory(category);setChannel("")}}}>{category}</Link>
    </li>
  )
}

export default Category
