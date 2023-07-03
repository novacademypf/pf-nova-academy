import { useEffect, useState } from "react";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import list from "./list.json";
import { getCategories } from "../../services/categoryRequest";

import { useSelector, useDispatch } from "react-redux";

import Dropdown from "../../components/DropDown/DropDown";
import { useDropDown } from "../../hooks/useDropdown";
import { getAllCategories } from "../../redux/actions/allCategoriesActions";
import {
  filterByCategoryCourse,
  setDefaultFilters,
  updateOptionFilters,
} from "../../redux/actions/filterActions";
import { getAllCourses } from "../../redux/actions/coursesActions";
import { sortByName } from "../../redux/actions/sortByNameActions";
const SectionFilter = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.getAllCategories.categories);
  const { maxPrice, minPrice } = useSelector(
    (state) => state.coursesReducer.courses
  );
  const { category } = useSelector(
    (state) => state.setOptionsFiltersReducer.filters
  );

  const { isLabel, setIsLabel, isOpen, toggleDropdown, setIsOpen } =
    useDropDown();
  const getData = () => {
    dispatch(getAllCategories());
  };
  const [selectedPrice, setSelectedPrice] = useState(minPrice);
  useEffect(() => {
    setSelectedPrice(minPrice); // Actualizar el estado local cuando minPriceRedux cambie
  }, [minPrice]);
  const handleOptionSelect = (e) => {
    const value = e.target.textContent;
    dispatch(updateOptionFilters({ category: value, price: "" }));
    dispatch(filterByCategoryCourse(value, true));
    setIsOpen(false);
  };
  const handleDeleteFilters = () => {
    dispatch(setDefaultFilters());
    dispatch(getAllCourses());
  };

  function handleSortByName(order) {
    switch (order.target.value) {
      case "a-z":
        return dispatch(sortByName(order.target.value));
      case "z-a":
        return dispatch(sortByName(order.target.value));
    }
  }

  const handlePriceChange = (event) => {
    const price = event.target.value;
    setSelectedPrice(price);
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
      <button
        className="focus:outline-none mt-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        onClick={handleDeleteFilters}
      >
        borrar filtros
      </button>
      <li>
        <select onChange={(e) => handleSortByName(e)}>
          <option value="selected">Ordenado Por Curso</option>
          <option value="ABC">A - Z</option>
          <option value="ZYX">Z - A</option>
        </select>
      </li>
      <div className="mt-4">
      <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700">
        Price Range:
      </label>
      <input
        type="range"
        id="priceRange"
        name="priceRange"
        min={minPrice}
        max={maxPrice}
        step="1"
        value={selectedPrice}
        onChange={handlePriceChange}
        className="w-full h-4 bg-gray-300 rounded-full appearance-none"
      />
      <p className="mt-2 text-sm text-gray-500">Selected Price: {selectedPrice}</p>
    </div>
    </section>
  );
};

export default SectionFilter;
