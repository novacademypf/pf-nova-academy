import * as React from "react";


import { useDispatch, useSelector } from "react-redux";
import { saveDataFilter, setMenuOptions } from "../../../redux/actions/filterActions";
import { filters } from "../../../helpers/filters";

export function InputRange() {
    const options=useSelector((state)=>state.setMenuOptionsReducer)
    const {courseAll}=useSelector((state)=>state.coursesReducer.courses)
  const dispatch = useDispatch();
  const handlePriceChange = (e) => {
    const { value, name } = e.target;
    let parsedValue = +value;

    // Check if the value is outside the allowed range
    if (parsedValue < 100) {
      parsedValue = 100; // Set to the minimum value if it's less than 100
    } else if (parsedValue > 200) {
      parsedValue = 200; // Set to the maximum value if it's greater than 200
    }

    dispatch(setMenuOptions("precio", { [name]: parsedValue }));
  };
  React.useEffect(()=>{
   
    
    dispatch(saveDataFilter(filters(options,courseAll)))
  },[options])
  return (
    <div className="bg-white max-w-full  border-purple-600 border-2 mt-2">
      <span>Precio</span>
      <div className="flex ">
        <label htmlFor="min">min</label>
        <input
          type="number"
          name="min"
          id="min"
          className="h-6 w-full"
          onChange={handlePriceChange}
          value={options.precio.min}
        />
        <label htmlFor="max">max</label>
        <input
          type="number"
          name="max"
          id="max"
          className="h-6 w-full"
          value={options.precio.max}
          onChange={handlePriceChange}
        />
      </div>
    </div>
  );
}
