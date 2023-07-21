import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Layout from "../../Layout";

export const SearchCourse = () => {
  const [courses, setCourses] = useState([
    { id: 1, name: "primer curso", price: 356 },
    { id: 2, name: "segundo curso", price: 200 },
  ]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("name");

  const getCoursesParams = async (name) => {
    try {
      let getCourses = await axios.get(`/courseForSale/search?name=${name}`);
      let data = await getCourses.data;
      console.log(data);
      setCourses(data);
    } catch (err) {
      console.log(err);
    }
  };
  const history = useNavigate();

  const handleGoBack = () => {
    history(-1);
  };
  useEffect(() => {
    getCoursesParams(name);
  }, [name]);

  return (
    <Layout className="relative">
      <button
        className=" absolute left-64 top-32 flex justify-center items-center  w-auto h-8 rounded-full m-2 p-2  cursor-pointer"
        onClick={handleGoBack}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
          />
        </svg>
      </button>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-8 mx-auto`}
      >
        {courses.map((el) => {
          return (
            <figure
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow "
              key={el.id}
            >
              <Link>
                <img className="rounded-t-lg" src={el.images} alt={el.name} />
              </Link>

              <figcaption className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {el.name}
                </h5>

                <p className="mb-3 font-normal text-gray-700 ">
                  {el.description}
                </p>
                <p className="mb-3 font-normal text-gray-700 ">{el.price}</p>
                <button
                  type="button"
                  className=" bg-[#00FFFF] hover:bg-cyan-200 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  <Link to={`/detail/${el.id}`}>Ver mas</Link>
                </button>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </Layout>
  );
};

/*  <Link
   className=" flex flex-row items-center bg-gray-50 border border-[#00FFFF] hover:bg-cyan-400 text-gray-900 text-lg font-bold rounded-lg focus:shadow-lg w-full pl-10 p-2.5 m-0.5"
   key={el.id}
   to={`/detail/${el.id}`}
 >
   {
     <img
       src={el.images[0]}
       alt={el.name}
       className="mr-2 w-10 h-10 rounded"
     />
   }
   <p>{el.name}</p>
 </Link> */
