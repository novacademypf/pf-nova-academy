import { useSelector } from "react-redux";
import Layout from "../../Layout";
<<<<<<< HEAD
import CourseCards from "../../components/CourseCards/CourseCards";
//eslint-disable-next-line
=======
import CourseCard from "../../components/CourseCards/CourseCards";
>>>>>>> 428f9e0bfa508a5b79da403c4736e63d6f12cb6a

const Courses = () => {
  const courses = useSelector((state) => state).coursesReducer.courses;

  return (
    <Layout>
      <CourseCards courses={courses} />
    </Layout>
  );
};

export default Courses;
