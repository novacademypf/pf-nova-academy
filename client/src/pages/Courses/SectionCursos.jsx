import { useSelector } from "react-redux";
import Pagination from "../../components/pagination/Pagination";
import CourseCards from "../../components/CourseCards/CourseCards";


const SectionCursos = () => {
    const courses = useSelector((state) => state.coursesReducer.courses)
  return (
    <section className=" min-w-[calc(100%-15em)] bg-orange-400   relative ">
      <Pagination />
      <div className="bg-amber-800 w-full relative top-[3.5em] " >
      <CourseCards courses={courses} />

      </div>
        
    
    </section>
  );
};

export default SectionCursos;
