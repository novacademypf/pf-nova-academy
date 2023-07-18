import SectionCursos from "./SectionCursos";
import SectionFilter from "./SectionFilter";

const Courses = () => {
  return (
    <main className="relative top-[0 rem] flex ">
      <SectionFilter />
      <SectionCursos />
    </main>
  );
};

export default Courses;
