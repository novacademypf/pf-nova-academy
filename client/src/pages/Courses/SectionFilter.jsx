import { useEffect, useState } from "react";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import list from "./list.json";
import { getCategories } from "../../services/categoryRequest";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Dropdown from "../../components/DropDown/DropDown";
import { useDropDown } from "../../hooks/useDropdown";
import { getAllCategories } from "../../redux/actions/allCategoriesActions";
import {  FilterCourseCategory, FilterOrdenAlfabetico, filterByCategoryCourse,  setDefaultFilters,  updateOptionFilters } from "../../redux/actions/filterActions";
import { getAllCourses } from "../../redux/actions/coursesActions";
import { getSortByName, setData } from "../../redux/actions/sortByNameActions";


const SectionFilter = () => {
  const dispatch = useDispatch();
  const {courseAll}= useSelector((state)=>state.coursesReducer.courses)
 
  const data = useSelector((state) => state.getAllCategories.categories);
  const { category } = useSelector(
    (state) => state.setOptionsFiltersReducer.filters
  );

  const { isLabel, setIsLabel, isOpen, toggleDropdown, setIsOpen } =
    useDropDown();
  const getData = () => {
  
    dispatch(getAllCategories());
  };

 const handleOptionSelect = (e) => {
    const value = e.target.textContent;
    dispatch(FilterCourseCategory (value, courseAll)) 
    setIsOpen(false);
  };

  const handleDeleteFilters=()=>{
    dispatch(setDefaultFilters())
    dispatch(getAllCourses())
  }
  
 const [courses, setCourses] = useState([])
 const [search, setSearch] = useState("")

 const URL = "http://localhost:3001/CourseForSale"

 const showData = async() => {
  const response = await fetch(URL)
  const data = await response.json()
  console.log(data)
  setCourses(data)
 }

 useEffect(() =>{
  showData()
 }, [])
 

function handleSortByName(order) {
  switch (order.target.value) {
    case "a-z":
      return dispatch(FilterOrdenAlfabetico(data))
    case "z-a":
      return dispatch(FilterOrdenAlfabetico(data))
    
  }
}

  return (
    <section className=" w-[15em] min-w-[15em] py-[2em] px-[1em]  fixed  z-50 left-[0] h-[calc(100vh-5.5em)] right-0 flex-col  overflow-auto justify-center">
      <Dropdown
        labelValue={"filtrar cursos por:"}
        isLabel={isLabel}
        isOpen={isOpen}
        selectedOption={category}
        toggleDropdown={toggleDropdown}
        data={data}
        getData={getData}
        handleOptionSelect={handleOptionSelect}
        
      />
      
      <button className="focus:outline-none mt-1 text-white bg-violet-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={handleDeleteFilters}>borrar filtros</button>
      
      <div className="relative inline-block w-64"/>
       <select className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" onChange={handleSortByName}>
         
                            <option value="selected">Filtro Por Orden Alfabetico</option>
                            <option value="a-z">A - Z</option>
                            <option value="z-a">Z - A</option>
                        </select>
    
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
    <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
      <path
        d="M10 12l-6-6 1.5-1.5L10 9l4.5-4.5L16 6l-6 6z"
      />
    </svg>
    </div>
    
      
        
                  
        
    </section>
    

  );
};

export default SectionFilter;
