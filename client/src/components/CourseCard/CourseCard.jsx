import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/shoppingCartActions";
import { Link } from "react-router-dom";

/* eslint-disable */

const CourseCard = ({ dataCard }) => {
  const { id, name, price, description, images, category } = dataCard;
  const dispatch = useDispatch();

  const handleCart = (data) => {
    dispatch(addToCart(data));
  };

  return (
    <div className="relative w-full max-w-sm shadow bg-gray-400 rounded-md p-3">
      <figure className=" relative  h-auto w-full">
        <span className="absolute bottom-0 left-0 bg-[#FFFFFF60] rounded-lg text-black text-xs m-2 px-3 py-0.5 ">
          {category[0]}
        </span>
        <Link to={`/detail/${id}`}>
          <img
            src="https://picsum.photos/800/600"
            alt={name}
            className="w-full rounded-lg object-cover "
          />
        </Link>
        <button className="absolute top-0 right-0 flex justify-center items-center bg-[#FFFFFF] w-6 h-6 rounded-full m-2 p-2">
          ♥️
        </button>
      </figure>
      <div className="flex flex-col justify-between mb-2">
        <span className="text-md font-bold">{name}</span>
        <span className="text-sm font-light">{description}</span>
        <span>⭐⭐⭐⭐⭐</span>
      </div>
      <div>
        <span className="text-lg font-medium">${price}</span>
        <button
          className="absolute bottom-0 right-1 flex justify-center items-center bg-[#FFFFFF] w-8 h-8 rounded-full m-2 p-2  cursor-pointer"
          onClick={() => {
            handleCart(dataCard);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
