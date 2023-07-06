import React from "react";

import { useDispatch } from "react-redux";

import SectionCursos from "./SectionCursos";
import SectionFilter from "./SectionFilter";

//eslint-disable-next-line

const Courses = () => {
  

  return (
    <main className=" relative top-[5.5rem] flex ">
      <SectionFilter />
      <SectionCursos />
    </main>
  );
};

export default Courses;
