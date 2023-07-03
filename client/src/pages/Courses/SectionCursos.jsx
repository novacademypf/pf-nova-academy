import { useSelector } from "react-redux";
import Pagination from "../../components/pagination/Pagination";
import CourseCards from "../../components/CourseCards/CourseCards";



const SectionCursos = () => {
  const {courseAll}= useSelector((state)=>state.coursesReducer.courses)
 
  return (
    <section className=" min-w-[calc(100%-15em)] left-[15em]   relative ">
      <Pagination />
      <div className=" w-full relative  top-[3.5em] " >
      <CourseCards courses={courseAll} />

      </div>
        
    
    </section>
  );
};

export default SectionCursos;
