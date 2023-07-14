
import { useSearchbar } from "../../../hooks/useSearchbar";
import lupa from '../../../assets/icons/lupa.svg'
export const Searchbar = () => {
  const { handleOnChange, valueInput,dataFilter } = useSearchbar()

  return (
    <>
      <div className="mb-1 bg-white  flex max-w-full h-9 rounded p-1 border-[#7D5FFF] border-[1px]"  >
        <img src={lupa} alt="lupa" className="w-5" />
        <input type="text" placeholder="buscar..." name="searchBar" onChange={handleOnChange} value={valueInput} className="w-full border-none focus:ring-0" />
      </div>
      <div
        className={`bg-white rounded max-h-56 overflow-auto ${
          dataFilter && dataFilter.length > 0 ? 'border-[#7D5FFF] border-[1px]' : ''
        }`}
      >
        {dataFilter &&
          dataFilter.map((item) => {
            return <p key={item.id}>{item.name}</p>;
          })}
      </div>
    </>
  );
};
