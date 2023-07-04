import { useEffect, useState } from "react";

import { getCategories } from "../../services/categoryRequest";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Dropdown from "../../components/DropDown/DropDown";
import { useDropDown } from "../../hooks/useDropdown";
import { getAllCategories } from "../../redux/actions/allCategoriesActions";
import {
  FilterCourseCategory,
  FilterOrdenAlfabetico,
  applyFilter,
  filterByCategoryCourse,
  getCourseDefaultFilters,
  setDefaultFilters,
  setOptionFilters,
  updateOptionFilters,
} from "../../redux/actions/filterActions";
import { getAllCourses } from "../../redux/actions/coursesActions";
import { getSortByName, setData } from "../../redux/actions/sortByNameActions";
import { setOptionsFiltersReducer } from "../../redux/reducers/filtersReducer";

const SectionFilter = () => {
  const dispatch = useDispatch();
  const { courseAll } = useSelector((state) => state.coursesReducer.courses);

  const data = useSelector((state) => state.getAllCategories.categories);
  const { category } = useSelector(
    (state) => state.setOptionsFiltersReducer.filters
  );
  const { cursosFiltrados, filters, isFiltered } = useSelector((state) => {
    return state.filterReducer;
  });
  console.log("satet-->", cursosFiltrados, filters, isFiltered);
  const [optionsFilters, setOptionsFilter] = useState({
    category: "todos",
    precio: "todos",
    orderAlphabetico: "A-z",
  });
  const { isLabel, setIsLabel, isOpen, toggleDropdown, setIsOpen } =
    useDropDown();
  const getData = () => {
    dispatch(getAllCategories());
  };
const [value,setValue]=useState(100)

const handleChangeRange =(e)=>{
  const value = e.target.value; 
  setValue(value)
}

  const handleOptionSelect = (e) => {
    const value = e.target.textContent;
    const name = e.target.getAttribute("name");
    setOptionsFilter({ ...optionsFilters, [name]: value });
    dispatch(setOptionFilters({ [name]: value }));

    /*   dispatch(FilterCourseCategory(value, courseAll)); */
    setIsOpen(false);
  };

  const handleDeleteFilters = () => {
    dispatch(setDefaultFilters());
    dispatch(getAllCourses());
  };

  useEffect(() => {
    if (isFiltered === false) {
      dispatch(getCourseDefaultFilters(true));

      return;
    }
    dispatch(
      applyFilter(
        filters.category,
        filters.precio,
        filters.orderAlphabetico,
        true
      )
    );
  }, [filters]);

  function handleSortByName(e) {
    const name = e.target.getAttribute("name");
    const value = e.target.value;
    setOptionsFilter({ ...optionsFilters, [name]: value });
    dispatch(setOptionFilters({ [name]: value }));
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
        name={"category"}
      />

     {/* <button
        className="focus:outline-none mt-1 text-white bg-violet-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        onClick={handleDeleteFilters}
      >
        borrar filtros
      </button>*/}

      <div className="relative inline-block w-64" />
      <select
        className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        name="orderAlphabetico"
        onChange={handleSortByName}
      >
        <option value="selected">Filtro Por Orden Alfabetico</option>
        <option value="A-z">A - Z</option>
        <option value="Z-a">Z - A</option>
      </select>

      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
          <path d="M10 12l-6-6 1.5-1.5L10 9l4.5-4.5L16 6l-6 6z" />
        </svg>
      </div>

      <label
        for="default-range"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
       seleccione el rango de precio
      </label>
      <input
        id="default-range"
        type="range"
        min={200}
        max={200}
        value={value}
        onChange={handleChangeRange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
      <p>price:{value}</p>
    </section>
    
    
  )}


export default SectionFilter;
