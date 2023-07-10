import { useState } from "react";

export const useDropDown=()=>{
    const [isOpen, setIsOpen] = useState(false);
  const [isLabel,setIsLabel] = useState(false);
   const toggleDropdown = () => { 
    setIsOpen(!isOpen);
    setIsLabel(true)
  };
   
  return {isOpen,toggleDropdown,setIsOpen,isLabel,setIsLabel};
}