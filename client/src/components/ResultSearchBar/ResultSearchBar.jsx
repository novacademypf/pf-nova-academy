import { Link } from "react-router-dom";
/* eslint-disable */
const ResultSearchBar = ({ results }) => {
  return (
    <div className="flex flex-row flex-wrap max-w-screen-md">
      {results.map((el) => (
        <Link
          className=" flex flex-row items-center bg-gray-50 border border-[#00FFFF] hover:bg-cyan-400 text-gray-900 text-lg font-bold rounded-lg focus:shadow-lg w-full pl-10 p-2.5 m-0.5"
          key={el.id}
          to={`/detail/${el.id}`}
        >
          {
            <img
              src={el.image}
              alt={el.name}
              className="mr-2 w-10 h-10 rounded"
            />
          }
          <p>{el.name}</p>
        </Link>
      ))}
    </div>
  );
};

export default ResultSearchBar;
