import * as React from "react";


import { useDispatch, useSelector } from "react-redux";
import { saveDataFilter, setMenuOptions } from "../../../redux/actions/filterActions";
import { filters } from "../../../helpers/filters";

export function InputRange() {
    const options=useSelector((state)=>state.setMenuOptionsReducer)
    const {courseAll,maxPrice,minPrice}=useSelector((state)=>state.coursesReducer.courses)
  const dispatch = useDispatch();
  const handlePriceChange = (e) => {
    const { value, name } = e.target;
    let parsedValue = +value;

   
    dispatch(setMenuOptions("precio", { [name]: parsedValue }));
  };
  React.useEffect(()=>{
   
    
    dispatch(saveDataFilter(filters(options,courseAll,{maxPrice,minPrice})))
  },[options])
  return (
    <div className="bg-white max-w-full border-b border-t border-[#7D5FFF] rounded mb-2 pb-2  mt-2">
      <span className="text-[#7D5FFF] font-semibold">Precio</span>
      <div className="flex ">
        <label htmlFor="min" className="text-[#7D5FFF] font-semibold">min</label>
        <input
          type="number"
          name="min"
          id="min"
          min={minPrice}
          className="h-6 w-full"
          onChange={handlePriceChange}
          value={options.precio?.min || ''}
        />
        <label htmlFor="max" className="text-[#7D5FFF] font-semibold">max</label>
        <input
          type="number"
          name="max"
          id="max"
          max={maxPrice}
          className="h-6 w-full"
          value={options.precio?.max || ''}
          onChange={handlePriceChange}
        />
      </div>
    </div>
  );
}
