import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import CourseCards from "../../components/CourseCards/CourseCards";
import { filterByCategory } from "../../redux/actions/filterByCategoryActions";
import SectionCursos from "./SectionCursos";
import SectionFilter from "./SectionFilter";
//eslint-disable-next-line

const Courses = () => {


 const categories = useSelector((state) => state.categories);
 
  function handleFilteredByCateg(e) {
    e.preventDefault();
    dispatch(filterByCategory(e.target.value));
  }

  return (  
       <main className="bg-green-500 relative top-[5.5rem] flex ">
       <SectionFilter/>
       <SectionCursos/>
       </main> 
  );
};

export default Courses;
