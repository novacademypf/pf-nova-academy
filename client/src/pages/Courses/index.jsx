import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../Layout";
import CourseCards from "../../components/CourseCards/CourseCards";
import { filterByCategory } from "../../redux/actions/filterByCategoryActions";
//eslint-disable-next-line

const Courses = () => {
  const courses = useSelector((state) => state).coursesReducer.courses;

  const categories = useSelector((state) => state.categories);

  function handleFilteredByCateg(e) {
    e.preventDefault();
    dispatch(filterByCategory(e.target.value));
  }

  return (
    <Layout>
      <select onChange={(e) => handleFilteredByCateg(e)}>
            <option value="all">BUSCA POR CATEGORIA</option>
            {categories.map((categ) => {
              return (
                <option value={categ} key={categ}>
                  {categ}
                </option>
              );
            })}
          </select>
      <CourseCards courses={courses} />
    </Layout>
  );
};

export default Courses;
