import React, { useEffect, useState } from "react";

import { Searchbar } from "./componentsFilters/Searchbar";
import { DropDown } from "./componentsFilters/DropDown";
import { useDispatch, useSelector } from "react-redux";
import estrella from "../../assets/icons/estrella.svg";
import {
  saveDataFilter,
  setMenuOptions,
} from "../../redux/actions/filterActions";
import { InputRange } from "./componentsFilters/InputRange";
import { filters } from "../../helpers/filters";

const SectionFilter = () => {
  const {categories}=useSelector((state)=>state.getAllCategories)
  const { courseAll,maxPrice,minPrice } = useSelector((state) => state.coursesReducer.courses);
  const options = useSelector((state) => state.setMenuOptionsReducer);
  
  const dispatch = useDispatch();
  const estrellas = [
    { id: 1, img: [estrella] },
    { id: 2, img: [estrella, estrella] },
    { id: 3, img: [estrella, estrella, estrella] },
    { id: 4, img: [estrella, estrella, estrella, estrella] },
    { id: 5, img: [estrella, estrella, estrella, estrella, estrella] },
  ];

  const handleCategory = (e) => {
    const { value, name } = e.target;
    dispatch(setMenuOptions(name, value));
    
  };

 

  const handleRaiting = (e) => {
    const { name, value, checked } = e.target;
    dispatch(setMenuOptions(name, +value));
  };
  const handleDeleteFiltros = () => {
    console.log('esty aqui')
    dispatch(setMenuOptions("default",{maxPrice,minPrice}));
  };
  
  return (
    <section className="    w-[15em] min-w-[15em] py-[1em] px-[1em]  fixed  z-50 left-[0] h-[calc(100vh-5.5em)] right-0 flex-col  overflow-auto justify-center">
      <Searchbar />
      <p className="border-[#7D5FFF] text-[#7D5FFF] text-lg font-semibold  border-b flex ">Filtros:</p>
      <DropDown
        title={"Categoria"}
        name={"categories"}
        data={categories}
        onChange={handleCategory}
      />
      


      <DropDown
        title={"Calificacion"}
        name={"raiting"}
        data={estrellas}
        onChange={handleRaiting}
      />
      <InputRange />
      <button
        className="bg-red-600 w-full mt-1 rounded p-1 text-[#FFF]"
        onClick={handleDeleteFiltros}
      >
        borrar filtros
      </button>
    </section>
  );
};
export default SectionFilter;