import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/shoppingCartActions";

const Detail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const dispatch = useDispatch();
  const [ratings, setRatings] = useState([]);

  const getUser = async () => {
    // console.log(useParams())
    console.log(courseId);
    const response = await axios.get(`/courseForSale/${courseId}`);
    const course = response.data;
    setCourse(course);
    return course;
  };

  const handleCart = (data) => {
    dispatch(addToCart(data));
  };

  const getRating = async () => {
    // console.log(useParams())
    console.log(courseId);
    const response = await axios.get(`/courseRating/${courseId}`);
    const ratings = response.data;
    setRatings(ratings);
    console.log(ratings);
    return ratings;
  };

  useEffect(() => {
    getUser();
    getRating();
  }, []);

  return (
    // <div>
    //   <div>
    //     <h1>{course.name}</h1>
    //     <p>{course.description}</p>
    //     <h2>{course.duration}</h2>
    //     <h1>{course.price}</h1>
    //   </div>
    //   <div>
    //     <img src={"https://picsum.photos/800/600?random=1"} alt={course.name} />
    //   </div>
    // </div>
    <div className="p-4 bg-gray-100">
      <div>
        <img
          className="object-cover w-full h-48"
          src={course.images}
          alt={course.name}
        />
      </div>
      <div className="relative max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">{course.name}</h1>
          <p className="text-gray-600 bg-gray-100">{course.description}</p>
          <h2 className="mt-4 text-lg font-semibold">
            Duración: {course.duration}
          </h2>
          <h1 className="mt-4 text-2xl font-bold">${course.price}</h1>
        </div>
        <div>
          <button
            className="absolute bottom-4 right-4 flex justify-center items-center bg-red-500 w-8 h-8 rounded-full m-2 p-2  cursor-pointer"
            onClick={() => {
              handleCart(course);
            }}
          >
            +
          </button>
        </div>
        <div className="container p-5">
          {ratings.map((e, index) => (
            // <h1>{e.rating}</h1>
            <div
              key={index}
              className="mb-4 border border-gray-300 bg-gray-100 p-3 rounded-md"
            >
              <h2 className="font-bold mb-2">
                Calificacion: {e.rating.toFixed(2)}
              </h2>
              <p>- {e.review}</p>
              <h1 className="font-bold text-right mt-4">{e.Profile.name}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Detail;
