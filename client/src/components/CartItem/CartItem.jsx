import { useDispatch } from "react-redux";
import { delFromCart } from "../../redux/actions/shoppingCartActions";

/* eslint-disable */
const CartItem = ({ dataCard }) => {
  const dipatch = useDispatch();
  const { id, name, images, price, quantity } = dataCard;

  let total = quantity * price;
  return (
    <div className="w-full max-w-md p-6  flex  flex-row  gap-4 justify-start items-center  border-b-2 ">
      <button
        onClick={() => {
          dipatch(delFromCart(id));
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-red-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <figure>
        <img
          className="w-12 h-12 rounded-lg"
          src="https://source.unsplash.com/random/800x600/?book=1"
          alt={name}
        />
      </figure>
      <figcaption className="">
        <h4>{name}</h4>
        <p>
          <strong>${price}</strong>
        </p>
      </figcaption>
    </div>
  );
};

export default CartItem;
