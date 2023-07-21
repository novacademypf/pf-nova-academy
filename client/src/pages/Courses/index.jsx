import { useDispatch, useSelector } from "react-redux";
import SectionCursos from "./SectionCursos";
import SectionFilter from "./SectionFilter";
import { filters } from "../../helpers/filters";
import { saveDataFilter } from "../../redux/actions/filterActions";
import { useEffect } from "react";
import { getAllCategories } from "../../redux/actions/allCategoriesActions";
import { getAllCourses } from "../../redux/actions/coursesActions";

const Courses = () => {
  const { dataFilter } = useSelector((state) => state.saveDataFilterReducer);
  const { courseAll, courseCount, maxPrice, minPrice } = useSelector(
    (state) => {
      return state.coursesReducer.courses;
    }
  );
  const options = useSelector((state) => state.setMenuOptionsReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(saveDataFilter(filters(options, courseAll)));
  }, [courseAll]);

  return (
    <main className="relative w-full h-[calc(100vh-5.5em)] top-[0 rem] flex">
      {courseAll === undefined ? (
        <div className="w-full h-full flex justify-center items-center">
          <div
            className="animate-spin inline-block w-[4em] h-[4em] border-[11px] border-current border-t-transparent text-[#00FFFF] rounded-full"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <SectionFilter />
          <SectionCursos />
        </>
      )}
    </main>
  );
};

export default Courses;
