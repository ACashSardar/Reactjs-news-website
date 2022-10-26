import React from "react";
import Category from "./Category";
import { Link } from 'react-router-dom'

const Navbar = ({handleSubmit,keyword,setKeyword,setCategory,categoryList,setChannel}) => {
  return <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-2 border-bottom border-secondary">
  <div className="container-fluid">
    <Link className="navbar-brand text-info">REACT NEWS APP</Link>
    <Link className=" text-light text-decoration-none">{new Date().toUTCString().slice(0,17)}</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
        {
          categoryList.map((catg)=>
            <Category category={catg} setCategory={setCategory} setChannel={setChannel}/>
          )
        }
        <li className="nav-item">
          <Link className="nav-link" to="/weather">Weather</Link>
        </li>
      </ul>
      
      <form className="d-flex mx-right" role="search" onSubmit={(e) => { e.target.elements.keyword.defaultValue!==""? handleSubmit(e):e.preventDefault()}} style={{width:"250px"}}>
        <input className="form-control me-0 rounded-0 bg-dark text-white border-secondary" value={keyword} name="keyword"  type="search" placeholder="Search by keywords.." aria-label="Search" onChange={(e)=>{setKeyword(e.target.value)}}/>
        <button className="btn btn-info text-light rounded-0" type="submit"><i className="fa fa-search"></i></button>
      </form>
    </div>
  </div>
</nav>;
};

export default Navbar;
