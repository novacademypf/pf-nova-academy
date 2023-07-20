import { useSelector } from "react-redux";
import chevron from "../../../assets/icons/chevron.svg";
import { useDropDown } from "../../../hooks/useDropdown";

export const DropDown = ({ title, name, data, onChange }) => {
  const options = useSelector((state) => state.setMenuOptionsReducer)
  const { isOpen, toggleDropdown } = useDropDown();
 
  return (
    <>
      <div
        className="mt-1 bg-white flex items-center justify-between max-w-full gap-1 border-b border-[#7D5FFF]"
        onClick={toggleDropdown}
        name={name}
      >
        <p className="text-[#7D5FFF] font-semibold">{title}</p>
        <img src={chevron} alt="chevron" className="w-4 block align-middle" />
      </div>
      <div
        className={`mt-1 bg-white rounded max-h-56 overflow-auto flex flex-col gap-1  ${
          isOpen ? "border-[#7D5FFF] border-[1px] p-1" : ""
        }`}
      >
        {true &&
          data &&
          data.map((item,i) => {
           
            if (name === "raiting") {
              return (
                <label key={item.id} htmlFor={item.id} className="flex items-center gap-[2px] bg-violet-200">
                  <input type="checkbox" value={item.id} checked={options.raiting.includes(item.id)} name={name} id={item.id} onChange={onChange} />
                  {item.img.map((start,index)=><img key={index} src={start} className="w-4 inline-block align-middle"/> )}
                </label>
              );
            }
            if (name === "categories") { 
              console.log(name,"aquiESTAMOS")
            return (
              <div key={item.id} className="flex items-center gap-[2px] bg-violet-200">
                <input 
                value={item.name}
                checked={options.categories?.includes(item.name)}
                type="checkbox" 
                name={name} 
                id={item.name} 
                onChange={onChange}/>

                
              <label  htmlFor={item.name}  className="flex items-center gap-[2px]">
               
                {item.name}
              </label></div>
              
            );

          }})}
        
      </div>
    </>
  );
};
