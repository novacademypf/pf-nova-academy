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
          value={options.precio?.min || ''}
        />
        <label htmlFor="max">max</label>
        <input
          type="number"
          name="max"
          id="max"
          className="h-6 w-full"
          value={options.precio?.max || ''}
          onChange={handlePriceChange}
        />
      </div>
    </div>
  );
}
