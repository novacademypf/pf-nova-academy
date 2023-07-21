import { useDispatch, useSelector } from "react-redux";

import CourseCards from "../../components/CourseCards/CourseCards";
import { getAllCourses, saveCourse } from "../../redux/actions/coursesActions";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import {
  saveDataFilter,
  setMenuOptions,
} from "../../redux/actions/filterActions";
import { filters } from "../../helpers/filters";
import lupaError from "../../assets/icons/lupaError.png";
const SectionCursos = () => {
  const { dataFilter } = useSelector((state) => state.saveDataFilterReducer);
  const { courseAll, courseCount, maxPrice, minPrice } = useSelector(
    (state) => {
      return state.coursesReducer.courses;
    }
  );
  const options = useSelector((state) => state.setMenuOptionsReducer);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8; // Cantidad de elementos por página

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCourses = dataFilter && dataFilter.slice(startIndex, endIndex); // Array de cursos paginados

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  useEffect(() => {
    // Actualizar la página actual cuando cambie el filtro
    setCurrentPage(0);
  }, [dataFilter]);

  const pageCount = Math.ceil(
    (dataFilter?.length || courseCount) / itemsPerPage
  ); // Número total de páginas

  console.log("-->>>>>>>>>>", paginatedCourses);
  return (
    <section className="min-w-[calc(100%-15em)] left-[15em] absolute   ">
      {/* Aca va la paginación */}
      {dataFilter?.length === 0 ? (
        <div className=" bg-purple-200 h-[calc(100vh-5.5em)] flex flex-col justify-center items-center ">
          <img src={lupaError} alt="lupa error" className="block" />
          <p className="font-bold text-2xl">No se encontraron resultados</p>
        </div>
      ) : (
        <>
          <div className="bg-purple-500 w-[calc(100%-15em)]  left-[15em] bg-white h-14 fixed z-30  flex justify-center items-center gap-2  ">
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              pageCount={pageCount}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              onPageChange={handlePageChange}
              containerClassName={
                "flex bg-purple-300 drop-shadow-lg rounded-[1em] px-4 py-2 jusify-center items-center gap-2"
              }
              pageClassName={
                "w-[1.5em] h-[1.5em]   rounded-[50%] flex items-center justify-center"
              }
              pageLinkClassName={
                "w-[1.5em] h-[1.5em] rounded-[50%] flex items-center font-bold  justify-center  "
              }
              activeClassName="bg-blue-600 text-white"
              breakClassName="flex items-center justify-center "
              breakLinkClassName="font-bold pointer-events-none"
              previousLinkClassName="font-bold"
              renderOnZeroPageCount={null}
              forcePage={currentPage} // Página actual
            />
          </div>
          <div className="sticky top-[3.5em] overflow-y-auto h-[calc(100vh-5.5em)]">
            <div className="w-full relative top-[3.5em]">
              <CourseCards courses={paginatedCourses} />
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default SectionCursos;
