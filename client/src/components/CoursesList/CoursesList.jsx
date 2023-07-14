import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCourse } from '../../redux/actions/coursesActions';
import Swal from 'sweetalert2';

const CoursesList = ({ courses }) => {
  console.log('Estamos en el curseslist');
  console.log(courses);

  console.log('Vamos a intentar acceder al array');

  const arrayCourses = courses.courseAll;
  const courseCount = courses.courseCount;
  console.log(arrayCourses);
  console.log(courseCount);



  const dispatch = useDispatch();
  const [deletedCourseIds, setDeletedCourseIds] = useState([]);

  const handleDeleteCourse = (courseId) => {
    console.log(courseId);
    dispatch(deleteCourse(courseId));
    setDeletedCourseIds([...deletedCourseIds, courseId]);
  };

  const showAlert = () => {
    Swal.fire({
      title: 'Éxito',
      text: 'Curso eliminado correctamente',
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });
  };

  const showErrorAlert = (error) => {
    Swal.fire({
      title: 'Error',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
  };



  const deleteCourseWithAlert = async (courseId) => {
    try {
      handleDeleteCourse(courseId);
      showAlert();
    } catch (error) {
      showErrorAlert(error)
      console.log(error);
    }
  };

  if (courses.length === 0) {
    return <h2>No existen cursos registrados por el momento</h2>;
  }

  return (
    <div className="xl:w-3/4 2xl:w-4/5 w-full">
      <div className="px-4 md:px-10 py-4 md:py-7">
        <div className="sm:flex items-center justify-between">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
            Cursos Activos ({courseCount})
          </p>
        </div>
      </div>
      {arrayCourses.map((course) => {
        if (deletedCourseIds.includes(course.id)) {
          return null; // Omitir el renderizado del curso eliminado
        }
        return (
          <div className="bg-white px-4 md:px-10 pb-5" key={course.id}>
            <div className="overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <tbody>
                  <tr className="text-sm leading-none text-gray-600 h-16">
                    <td className="w-1/2">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-700 rounded-sm flex items-center justify-center">
                          {course.imageUrl && (
                            <img
                              className="hidden xl:block w-full"
                              src={course.imageUrl}
                              alt="avatar"
                            />
                          )}
                        </div>
                        <div className="pl-2">
                          <h2 className="text-sm font-medium leading-none text-gray-800">
                            {course.name}
                          </h2>
                        </div>
                      </div>
                    </td>
                    <td className="pl-16">
                      <p>{course.description}</p>
                    </td>
                    <td className="pl-16">
                      <p>{course.id}</p>
                    </td>

                    <td>
                    <button
  className="mt-4 bg-blue-600 hover:underline px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
  onClick={() => deleteCourseWithAlert(course.id)} // Cambio realizado aquí
>
  Eliminar
</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CoursesList;
