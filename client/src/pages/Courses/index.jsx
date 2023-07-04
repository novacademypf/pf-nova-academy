import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import SectionCursos from "./SectionCursos";
import SectionFilter from "./SectionFilter";
import { getAllCourses } from "../../redux/actions/coursesActions";
import { applyFilter, getCourseDefaultFilters } from "../../redux/actions/filterActions";
//eslint-disable-next-line

const Courses = () => {
  
const dispatch = useDispatch()
/*   useEffect(()=>{
    dispatch(getAllCourses(1,10))
  },[]) */
  
  return (  
       <main className=" relative top-[5.5rem] flex ">
       <SectionFilter/>
       <SectionCursos/>
       </main> 
  );
};

export default Courses;
