
const Dropdown = ({
    isLabel,
  labelValue,
  selectedOption,
  toggleDropdown,
  isOpen,
  handleOptionSelect,
  data,
  getData,
  name,
  bgColor="bg-white",
}) => {
  return (
    <div className= {`relative  ${bgColor} `}>
      <label
        className={`${
          isLabel ? " text-base text-gray-700 bg-white border-gray-300 rounded leading-tight  " : "text-sm "
        } absolute transition-all duration-300 pointer-events-none left-2  ${
           isLabel ? "top-[-9px]" : "top-2"
        } `}
        style={{ height: "calc(100% - 2px)" }}
        
      >
        {/*block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-3 
      pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-base*/}

        {  labelValue}      
      </label>
      <div
        className={`${
          isOpen ? "border-white-200" : "border-white-300"
        }rounded-md p-3 flex items-center justify-between cursor-pointer`}
        onClick={()=>{ toggleDropdown(),getData()}}
       
      >
        <div className="text-gray-700 ">{isLabel && selectedOption}</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 fill-current transition-transform duration-300 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M6.293 7.293a1 1 0 0 1 1.414 0L10 9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {isOpen && (
        <ul className="mt-1 border w-full border-gray-300 rounded-md shadow-lg absolute z-10 bg-white">
          {data &&
            data.map((item, index) => {
              return (
                <li
                  key={item.id}
                  className="py-1 px-3 hover:bg-gray-100 cursor-pointer"
                  onClick={handleOptionSelect}
                  name={name}
                >
                  {item.name}
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};
export default Dropdown;
