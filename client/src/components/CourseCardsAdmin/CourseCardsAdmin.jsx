import CourseCardAdmin from "../CourseCardAdmin/CourseCardAdmin";
/* eslint-disable */

const CourseCardsAdmin = ({ courses }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {courses?.map((el) => {
        return <CourseCardAdmin key={el.id} dataCard={el} />;
      })}
    </div>
  );
};

export default CourseCardsAdmin;
