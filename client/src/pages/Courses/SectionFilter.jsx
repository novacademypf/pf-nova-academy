import { useState } from "react";
import {AiOutlineCaretUp, AiOutlineCaretDown} from "react-icons/ai";
import list from "./list.json"



const SectionFilter = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenU, setIsOpenU] = useState(false)
    const [isOpenCat, setIsOpenCat] = useState(false)
  return (
    <section className="w-[20%] bg-purple-400 h-[100vh] flex-col  justify-center">
    <div>
    <div className="bg-[#00FFFF] text-green-700 px-1 py-1 m-8">
        <button onClick={() => setIsOpenCat((prev) => !prev)} className="bg-Esmerald-200 p-4 w-full flex item">
            <h1 className="text-center font-bold">CATEGORIAS</h1>
            {!isOpenCat? (
                <AiOutlineCaretDown className="h-8"/>
            ):(
                <AiOutlineCaretUp className="h-8"/>   
            )
        }
        </button>
        {isOpenCat && (
            <div className="bg-Esmerald-100 relative flex flex-col items-start rounded-lg p-2 w-full">
                {list.map((item, i) =>(
                    <div>
                        <h3>{item.city}</h3>
                    </div>
                ))}
            </div>
        )}
      </div>
        <h1 className="text-center">PRECIOS</h1>
      <div className="bg-[#00FFFF] text-green-700 px-1 py-1 m-8">
        <button onClick={() => setIsOpen((prev) => !prev)} className="bg-Esmerald-200 p-4 w-full flex item font-bold">
            Mayor a Menor
            {!isOpen? (
                <AiOutlineCaretDown className="h-8"/>
            ):(
                <AiOutlineCaretUp className="h-8"/>   
            )
        }
        </button>
        {isOpen && (
            <div className="bg-Esmerald-100 relative flex flex-col items-start rounded-lg p-2 w-full">
                {list.map((item, i) =>(
                    <div>
                        <h3>{item.city}</h3>
                    </div>
                ))}
            </div>
        )}
      </div>
      <div className="bg-[#00FFFF] text-green-700 px-1 py-1 m-8">
        <button onClick={() => setIsOpenU((prev) => !prev)} className="bg-Esmerald-200 p-4 w-full flex item font-bold">
            Menor a Mayor
            {!isOpenU? (
                <AiOutlineCaretDown className="h-8"/>
            ):(
                <AiOutlineCaretUp className="h-8"/>   
            )
        }
        </button>
        {isOpenU && (
            <div className="bg-Esmerald-100 relative flex flex-col items-start rounded-lg p-2 w-full">
                {list.map((item, i) =>(
                    <div>
                        <h3>{item.city}</h3>
                    </div>
                ))}
            </div>
        )}
      </div>

      
      
    </div>
    </section>
  );
};

export default SectionFilter;
