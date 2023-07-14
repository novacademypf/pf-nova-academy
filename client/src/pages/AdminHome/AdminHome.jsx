import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import UserList from '../../components/UserList/UserList';
import { getUsers } from '../../redux/actions/userActions';
import { getCoursesTotal } from '../../redux/actions/coursesActions';
import CoursesList from '../../components/CoursesList/CoursesList';



function AdminHome() {
  const dispatch = useDispatch();

  const courses = useSelector((state) => state).coursesReducer.courses;
  console.log(courses);

  const users = useSelector((state) => state.userReducer.users);
  const coursesAll = useSelector((state) => state).coursesReducer.courses.courseAll; // <--  Ali este es el array con la info de los cursos
  

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(getCoursesTotal());
  }, [dispatch]);



  return (
    <div className="pb-16">
            <div className="bg-gray-100 flex flex-col justify-center items-center pt-9 sm:pt-12 lg:pt-16 pb-24 sm:pb-52">
                <div className="2xl:container 2xl:mx-auto flex flex-col justify-center items-center sm:pb-12 lg:pb-0 space-y-4 px-4 md:px-6 2xl:px-0">
                    <div>
                        <p className="text-3xl lg:text-4xl font-semibold leading-9 text-center text-gray-800">Panel de control </p>
                    </div>
                    <div>
                        <p className="text-base leading-normal sm:leading-none text-center text-gray-600">A continuacion podras ver todos los cursos disponibles y eliminarlos si lo deseas</p>
                    </div>
                </div>
            </div>
            <div className="-mt-16 sm:-mt-48 lg:-mt-32 xl:-mt-40 2xl:container 2xl:mx-auto flex justify-center items-center space-y-4 px-4 md:px-6 2xl:px-0 mb-16">
            <CoursesList courses={courses} />
                
            </div>


            <div className="bg-gray-100 flex flex-col justify-center items-center pt-9 sm:pt-12 lg:pt-16 pb-24 sm:pb-52">
                <div className="2xl:container 2xl:mx-auto flex flex-col justify-center items-center sm:pb-12 lg:pb-0 space-y-4 px-4 md:px-6 2xl:px-0">
                    <div>
                        <p className="text-3xl lg:text-4xl font-semibold leading-9 text-center text-gray-800">Usuarios Registrados </p>
                    </div>
                    <div>
                        <p className="text-base leading-normal sm:leading-none text-center text-gray-600">A continuacion podras ver todos los usuarios registrados y eliminarlos si lo deseas</p>
                    </div>
                </div>
            </div>
            <div className="-mt-16 sm:-mt-48 lg:-mt-32 xl:-mt-40 2xl:container 2xl:mx-auto flex justify-center items-center space-y-4 px-4 md:px-6 2xl:px-0 mb-16">
            
           <UserList users={users} />
                
            </div>
        </div>
  );
}

export default AdminHome;

