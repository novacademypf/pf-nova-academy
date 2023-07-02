import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

export const SearchCourse = () => {
  const [courses, setCourses] = useState([
    { id: 1, name: "primer curso" },
    { id: 2, name: "segundo curso" },
  ]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("name");

  const getCoursesParams = async (name) => {
    try {
      let getCourses = await axios.get(
        `http://localhost:3001/courseForSale/search?name=${name}`
      );
      let data = await getCourses.data;
      setCourses(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCoursesParams(name);
  }, [name]);

  return (
    <div>
      {courses.map((el) => {
        return (
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
        );
      })}
    </div>
  );
};
