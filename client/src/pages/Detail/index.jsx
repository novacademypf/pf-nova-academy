import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/shoppingCartActions";
import Layout from "../../Layout";

const Detail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const dispatch = useDispatch();
  const [ratings, setRatings] = useState([]);
  const headPhoto = course.images?.includes("example")
    ? "https://source.unsplash.com/random/800x600"
    : course.images;

  const getUser = async () => {
    // console.log(useParams())
    const response = await axios.get(`/courseForSale/${courseId}`);
    const course = response.data;
    course.images = course.images.replace(/[{}]/g, "");
    setCourse(course);
    return course;
  };
  const history = useNavigate();

  const handleGoBack = () => {
    history(-1);
  };

  const handleCart = (data) => {
    dispatch(addToCart(data));
  };

  const getRating = async () => {
    // console.log(useParams())
    const response = await axios.get(`/courseRating/${courseId}`);
    const ratings = response.data;
    setRatings(ratings);
    return ratings;
  };

  useEffect(() => {
    getUser();
    getRating();
  }, []);

  return (
    <Layout className="bg-gray-100 ">
      <div className="relative flex flex-row w-full flex-wrap mx-auto min-h-fit bg-white shadow-md rounded-lg mt-8">
        <div className="w-full rounded-lg">
          <img
            className="object-cover w-full h-48 rounded-lg"
            src={headPhoto}
            alt={course.name}
          />
        </div>
        <div className="flex flex-row">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">{course.name}</h1>
            <p className="text-gray-600 bg-gray-100">{course.description}</p>
            <h2 className="mt-4 text-lg font-semibold">
              Duración: {course.duration}
            </h2>
            <h1 className="mt-4 text-2xl font-bold">${course.price}</h1>
            <button
              className="  flex justify-center items-center bg-red-500 w-auto h-8 rounded-full my-2 p-2  cursor-pointer"
              onClick={() => {
                handleCart(course);
              }}
            >
              Añadir al carrito
            </button>
          </div>
          <div className="container p-5 ">
            {ratings.map((e, index) => (
              // <h1>{e.rating}</h1>
              <div
                key={index}
                className="mb-4 border border-gray-300 bg-gray-100 p-3 rounded-md"
              >
                <h2 className="font-bold mb-2">
                  Calificacion: {Math.round(e.rating)}
                </h2>
                <p>- {e.review}</p>
                <h1 className="font-bold text-right mt-4">{e.Profile.name}</h1>
              </div>
            ))}
          </div>
        </div>
        <div>
          <button
            className="absolute bottom-8 left-4 flex justify-center items-center  w-auto h-8 rounded-full m-2 p-2  cursor-pointer"
            onClick={handleGoBack}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="cur|ntColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
              />
            </svg>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Detail;
