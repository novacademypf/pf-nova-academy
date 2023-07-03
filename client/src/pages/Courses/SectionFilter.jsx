import { useState } from "react";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import list from "./list.json";
import { getCategories } from "../../services/categoryRequest";

import { useSelector, useDispatch } from "react-redux";

import Dropdown from "../../components/DropDown/DropDown";
import { useDropDown } from "../../hooks/useDropdown";
import { getAllCategories } from "../../redux/actions/allCategoriesActions";
import {  filterByCategoryCourse,  updateOptionFilters } from "../../redux/actions/filterActions";
const SectionFilter = () => {
  const dispatch = useDispatch();
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
    dispatch(updateOptionFilters({ category: value, price: "" }));
    dispatch(filterByCategoryCourse(value, true));
    setIsOpen(false);
  };
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
    </section>
  );
};

export default SectionFilter;
