import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/pagination/Pagination";
import CourseCards from "../../components/CourseCards/CourseCards";
import { saveCourse } from "../../redux/actions/coursesActions";
import { useEffect } from "react";




const SectionCursos = () => {
  const {courseAll}= useSelector((state)=>state.coursesReducer.courses)
  const  data = useSelector((state)=>state.filterReducer.listaCategoria)
  console.log('===>', data)
  const newData = data? data: courseAll

  const dispatch = useDispatch()
  /*useEffect(() =>{
    dispatch(saveCourse(newData))
   }, [data])*/
   


  return (
    <section className=" min-w-[calc(100%-15em)] left-[15em]   relative ">
     {/*  <Pagination /> */}
      <Pagination/>     
      <div className=" w-full relative  top-[3.5em] " >
      <CourseCards courses={newData&&newData} />

      </div>
        
    
    </section>
  );
};

export default SectionCursos;
