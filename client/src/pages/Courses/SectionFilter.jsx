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

  return (
    <section className=" bg-purple-300 w-[15em] min-w-[15em] py-[2em] px-[1em]  fixed  z-50 left-[0] h-[calc(100vh-5.5em)] right-0 flex-col  overflow-auto justify-center">
      <Searchbar />
      <p className="border-[#7D5FFF] border-b">Filtros:</p>
      <DropDown
        title={"Raiting"}
        name={"raiting"}
        data={estrellas}
        onChange={handleRaiting}
      />
      <InputRange/>
    </section>
  );
};
export default SectionFilter;
