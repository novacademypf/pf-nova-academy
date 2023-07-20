import { useDispatch, useSelector } from "react-redux";
import SectionCursos from "./SectionCursos";
import SectionFilter from "./SectionFilter";
import { filters } from "../../helpers/filters";
import { saveDataFilter } from "../../redux/actions/filterActions";
import { useEffect } from "react";
import { getAllCategories } from "../../redux/actions/allCategoriesActions";



const Courses = () => {
  const { courseAll, courseCount, maxPrice, minPrice } = useSelector(
    (state) => {
      return state.coursesReducer.courses;
    }
  );
  const options = useSelector((state) => state.setMenuOptionsReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(saveDataFilter(filters(options, courseAll)));
    console.log('acaindex')
  }, [courseAll]);

  

  return (
    <main className="relative top-[0 rem] flex ">
      <SectionFilter />
      <SectionCursos />
    </main>
  );
};

export default Courses;
