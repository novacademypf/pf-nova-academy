import React, { useEffect, useState } from "react";

import { Searchbar } from "./componentsFilters/Searchbar";
import { DropDown } from "./componentsFilters/DropDown";
import { useDispatch, useSelector } from "react-redux";
import estrella from "../../assets/icons/estrella.svg";
import { setMenuOptions } from "../../redux/actions/filterActions";
import { InputRange } from "./componentsFilters/InputRange";

const SectionFilter = () => {
  /* const {categories}=useSelector((state)=>state.getAllCategories)*/
  const dispatch = useDispatch();
  const estrellas = [
    { id: 1, img: [estrella] },
    { id: 2, img: [estrella, estrella] },
    { id: 3, img: [estrella, estrella, estrella] },
    { id: 4, img: [estrella, estrella, estrella, estrella] },
    { id: 5, img: [estrella, estrella, estrella, estrella, estrella] },
  ];

  const handleRaiting = (e) => {
    const { name, value, checked } = e.target;
    dispatch(setMenuOptions(name, value));
  };
  const handleDeleteFiltros=()=>{
    
  }

  
  return (
    <section className=" bg-purple-300 w-[15em] min-w-[15em] py-[2em] px-[1em]  fixed  z-50 left-[0] h-[calc(100vh-5.5em)] right-0 flex-col  overflow-auto justify-center">
    <h2 className="mb-5">Filtra Por Categoria:</h2>
    <Dropdown
      islabel={"Filtrar Categorias"}
      //labelValue={"filtrar Categorias:"}
      isLabel={isLabel}
      isOpen={isOpen}
      selectedOption={filters.category}
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
    <div className="mb-8">                               </div>
    <h2 className="mb-0">Filtra Por Orden Alfabetico:</h2>
    <div className="relative inline-block w-64" />
    <select
      className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 p-3 py-3 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-base"
      name="orderAlphabetico"
      value={filters.orderAlphabetico}
      onChange={handleSortByName}
    >
      <option value="selected">Filtro Por Orden Alfabetico</option>
      <option value="A-z">A - Z</option>
      <option value="Z-a">Z - A</option>
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <svg className="fill-current h-4 w-4">
        <path d="M10 12l-6-6 1.5-1.5L10 9l4.5-4.5L16 6l-6 6z" />
      </svg>
    </div>
    <div className="mb-4"></div>
    <label
      htmlFor="default-range"
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      Seleccione el Rango de Precio
    </label>
    <input
      id="default-range"
      type="range"
      min={100}
      max={200}
      name="precio"
      value={value}
      onChange={handleChangeRange}
      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
    />
    <p>price:{value}</p>
    <button
      className="focus:outline-none mt-1 text-white bg-violet-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      onClick={handleDeleteFilters}
    >
      Borrar Filtros
    </button>
  </section>
);
};
export default SectionFilter;
