import React, { useEffect, useState } from "react";

<<<<<<< HEAD
import {Searchbar} from "./componentsFilters/Searchbar";
=======
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
>>>>>>> d7fb8a13fc2586bd655c9cad58e5497d885d09c3

const SectionFilter = () => {
  const {categories}=useSelector((state)=>state.getAllCategories)
  const { courseAll } = useSelector((state) => state.coursesReducer.courses);
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
    const { value } = e.target;
    dispatch(setMenuOptions("categoria", value));
  };

 

  const handleRaiting = (e) => {
    const { name, value, checked } = e.target;
    dispatch(setMenuOptions(name, +value));
  };
  const handleDeleteFiltros = () => {
    dispatch(setMenuOptions("default"));
  };

  return (
    <section className=" bg-purple-300 w-[15em] min-w-[15em] py-[2em] px-[1em]  fixed  z-50 left-[0] h-[calc(100vh-5.5em)] right-0 flex-col  overflow-auto justify-center">
      <Searchbar />
      <p className="border-[#7D5FFF] border-b">Filtros:</p>
      <DropDown
        title={"Categoria"}
        name={"categoria"}
        data={categories}
        onChange={handleCategory}
      />



      <DropDown
        title={"Raiting"}
        name={"raiting"}
        data={estrellas}
        onChange={handleRaiting}
      />
      <InputRange />
      <button
        className="bg-red-600 mt-1 rounded p-1 text-[#FFF]"
        onClick={handleDeleteFiltros}
      >
        borrar filtros
      </button>
    </section>
  );
};
export default SectionFilter;
