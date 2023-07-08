import React from "react";
import SectionCursos from "./SectionCursos";
import SectionFilter from "./SectionFilter";

const Courses = () => {
  
  return (  
       <main className=" relative top-[5.5rem] flex ">
       <SectionFilter/>
       <SectionCursos/>
       </main> 
  );
};

export default Courses;
