import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CoursesCreated() {
  const { id } = useParams();
  const [courseCreated, setCourseCreated] = useState({});

  const getCourseCreated = async () => {
    const response = await axios.get(
      `http://localhost:3001/courseForSale/${id}`
    );
    const courseCreated = response.data;
    setCourseCreated(courseCreated);
    return courseCreated;
  };

  useEffect(() => {
    getCourseCreated();
  }, []);

  return (
    <div>
      <h1>{courseCreated.name}</h1>
    </div>
  );
}
