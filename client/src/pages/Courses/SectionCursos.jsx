import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/pagination/Pagination";
import CourseCards from "../../components/CourseCards/CourseCards";
import { saveCourse } from "../../redux/actions/coursesActions";
import { useEffect } from "react";

const SectionCursos = () => {

  
  const { cursosFiltrados, filters,isFiltered,cursos } = useSelector((state) => {
    console.log('->>>',state.filterReducer);
    return state.filterReducer;
  });
console.log('-->cursosqqwwq',cursosFiltrados);
  return (
    <section className=" min-w-[calc(100%-15em)] left-[15em]   relative ">
      {/*  <Pagination /> */}
      <div className=" w-full relative  top-[3.5em] ">
        <CourseCards courses={isFiltered?cursosFiltrados.courseAll:cursos.courseAll} />
      </div>
    </section>
  );
};

export default SectionCursos;
