
import React from "react";

import { Searchbar } from "./componentsFilters/Searchbar";

const SectionFilter = () => {
 
  return (
    <section className=" bg-purple-300 w-[15em] min-w-[15em] py-[2em] px-[1em]  fixed  z-50 left-[0] h-[calc(100vh-5.5em)] right-0 flex-col  overflow-auto justify-center">
    <Searchbar/>
    
  </section>
);
};
export default SectionFilter;