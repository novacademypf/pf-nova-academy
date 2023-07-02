import { Link } from "react-router-dom";

const ResultSearchBar = ({ results }) => {
  console.log();
  return (
    <div className="flex flex-row flex-wrap">
      {results.map((el) => (
        <div className="border p-2" key={el.id}>
          <Link>{el.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default ResultSearchBar;
