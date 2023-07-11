import CourseCardAdmin from "../CourseCardAdmin/CourseCardAdmin";


const CourseCardsAdmin = ({ courses }) => {
  console.log(courses);

  if(!courses || !Array.isArray(courses)) {
    return <p>No hay cursos disponibles.</p>;
    }


  return (
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {courses?.map((el) => (
        <CourseCardAdmin key={el.id} dataCard={el} />
      ))}
    </div>
  );
};

export default CourseCardsAdmin;
