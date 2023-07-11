import { Link } from "react-router-dom";
import "./styles.css";
import { useEffect, useState } from "react";

/* eslint-disable */

export const ShoppingCartAside = ({
  closeCart,
  cartItems,
  deleteItemfromAside,
}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    cartItems.length <= 0 ? setIsDisabled(true) : setIsDisabled(false);
  }, [cartItems]);

  return (
    <aside className=" shopping-aside flex flex-col fixed right-0 bg-white  border-2 rounded  z-20 p-6">
      <section className="flex items-center  justify-between">
        <h2 className=" font-medium text-xl">Carrito de compras</h2>
        <button
          className="hover:bg-slate-600"
          onClick={() => {
            closeCart();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </section>
      <div className=" mt-2">
        {cartItems.map((el) => (
          <div
            key={el.id}
            className="flex flex-row justify-between   items-center border  border-[#00FFFF] rounded p-4 w-full mb-2"
          >
            <button
              onClick={() => {
                deleteItemfromAside(el.id);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-red-400 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>

            <div>{el.name}</div>
            <div>${el.price}</div>
          </div>
        ))}
      </div>
      <Link to="/checkout">
        <button
          onClick={() => {
            closeCart();
          }}
          type="button"
          disabled={isDisabled}
          className={`  ${
            isDisabled
              ? "bg-gray-200 text-gray-500"
              : "bg-[#00FFFF] hover:bg-cyan-200"
          }  focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-4 mx-auto w-full`}
        >
          Ir a Pagar
        </button>
      </Link>
    </aside>
  );
};
