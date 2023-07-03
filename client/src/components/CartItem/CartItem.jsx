import { useDispatch } from "react-redux";
import {
  addToCart,
  delFromCart,
} from "../../redux/actions/shoppingCartActions";

/* eslint-disable */
const CartItem = ({ dataCard }) => {
  const dipatch = useDispatch();
  const { id, name, images, price, quantity } = dataCard;
  let total = quantity * price;
  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 ">
      <div className="flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          <li className="pt-3 pb-0 sm:pt-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img
                  className="w-12 h-12 rounded-md"
                  src="https://picsum.photos/800/600"
                  alt={name}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  {name}
                </p>
                <div classNameName="flex flex-row items-center justify-between">
                  <button
                    classNameName=" flex justify-center items-center bg-[#FFFFFF] w-6 h-6 rounded-full m-2 p-2"
                    onClick={() => {
                      dipatch(delFromCart(id));
                    }}
                  >
                    -
                  </button>
                  <span classNameName="text-lg font-medium">{quantity}</span>
                  <button
                    classNameName="flex justify-center items-center bg-[#FFFFFF] w-6 h-6 rounded-full m-2 p-2"
                    onClick={() => {
                      dipatch(addToCart(dataCard));
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                ${price}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CartItem;
/* <div classNameName="flex flex-row  h-max w-5/6 bg-light-gray rounded-md p-3 ">
      <figure classNameName=" relative  h-fit w-full">
        <span classNameName="absolute bottom-0 left-0 bg-[#FFFFFF60] rounded-lg text-black text-xs m-2 px-3 py-0.5 ">
          {category}
        </span>
        {
          <img
            src="https://picsum.photos/800/600"
            alt={name}
            classNameName="w-auto h-auto rounded-lg object-cover "
          />
        }
      </figure>
      <div classNameName="flex flex-col justify-start">
        <span classNameName="text-md font-bold">{name}</span>
        <span classNameName="text-sm font-light">{description}</span>
        <div classNameName="flex flex-row items-center">
          <button
            classNameName=" flex justify-center items-center bg-[#FFFFFF] w-6 h-6 rounded-full m-2 p-2"
            onClick={() => {
              dipatch(delFromCart(id));
            }}
          >
            -
          </button>
          <span classNameName="text-lg font-medium">{quantity}</span>
          <button
            classNameName="flex justify-center items-center bg-[#FFFFFF] w-6 h-6 rounded-full m-2 p-2"
            onClick={() => {
              dipatch(addToCart(dataCard));
            }}
          >
            +
          </button>
          <span classNameName="m-2">x</span>
          <span classNameName="text-lg font-medium ">${price}</span>
        </div>
        <span classNameName="text-lg font-bold mx-auto ">Total: ${total}</span>
      </div>
    </div> */
