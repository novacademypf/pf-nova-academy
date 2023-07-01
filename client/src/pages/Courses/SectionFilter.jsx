import { useState } from "react";
import {AiOutlineCaretUp, AiOutlineCaretDown} from "react-icons/ai";
import list from "./list.json"



const SectionFilter = () => {
    const [isOpen, setIsOpen] = useState(false)
  return (
    <section className="w-[20%] bg-blue-400 h-[100vh] flex-col  justify-center">
    <div>
      <div className="bg-red-400 text-green-700 px-1 py-1 m-20">
        <button onClick={() => setIsOpen((prev) => !prev)} className="bg-rose-400 p-4 w-full flex item">
            Precios
            {!isOpen? (
                <AiOutlineCaretDown className="h-8"/>
            ):(
                <AiOutlineCaretUp className="h-8"/>   
            )
        }
        </button>
        {isOpen && (
            <div className="bg-red-400 relative flex flex-col items-start rounded-lg p-2 w-full">
                {list.map((item, i) =>(
                    <div>
                        <h3>{item.city}</h3>
                    </div>
                ))}
            </div>
        )}
      </div>
      <input placeholder="Los mejores precios"
      className="border border-grey 300 rounded py-2 pl-5 w-full focus border-grey-400 focus: outline-none"/>
    </div>
    </section>
  );
};

export default SectionFilter;
