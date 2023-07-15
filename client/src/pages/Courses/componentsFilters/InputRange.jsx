import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveDataFilter, setMenuOptions } from "../../../redux/actions/filterActions";
import { filters } from "../../../helpers/filters";

export const InputRange = () => {
  const options = useSelector((state) => state.setMenuOptionsReducer);
  const {precio}=options
  const {  minPrice,courseAll } = useSelector((state) => {
    return state.coursesReducer.courses;
  });
  const {dataFilter}=useSelector((state)=>state.saveDataFilterReducer)
  const dispatch = useDispatch();
  const dataMax = dataFilter&&dataFilter.map((item)=>{
    return item.price
  })
const maxPrice = dataMax && Math.max(...dataMax);

  const handleMaxPriceChange = (event) => {
    const { name, value } = event.target;
    dispatch(setMenuOptions(name, { min: parseInt(value), max:maxPrice }));
  };
 useEffect(()=>{
dispatch(saveDataFilter(filters(options,courseAll)))
 },[options])
  return (
    <div className="flex flex-col space-y-4">
      <label htmlFor="maxPrice" className="font-bold">
        Precio: min ${precio.min} - max ${maxPrice}
      </label>
      <input
        type="range"
        id="maxPrice"
        name="precio"
        min={minPrice}
        max={maxPrice}
        step={1}
        value={precio.min}
        onChange={handleMaxPriceChange}
        className="w-full"
      />
    </div>
  );
};
