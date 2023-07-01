import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../Layout";
import CourseCards from "../../components/CourseCards/CourseCards";
import { filterByCategory } from "../../redux/actions/filterByCategoryActions";
import SectionCursos from "./SectionCursos";
//eslint-disable-next-line

const Courses = () => {
  const courses = useSelector((state) => state).coursesReducer.courses;

 const categories = useSelector((state) => state.categories);
 
  function handleFilteredByCateg(e) {
    e.preventDefault();
    dispatch(filterByCategory(e.target.value));
  }

  return (  
       <main className="bg-green-500">
       <SectionCursos/>
       </main> 
  );
};

export default Courses;
