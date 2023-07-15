import { useState } from "react";

export const useDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return { isOpen, toggleDropdown };
};
