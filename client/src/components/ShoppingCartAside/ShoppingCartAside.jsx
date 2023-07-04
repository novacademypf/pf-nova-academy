import { Link } from "react-router-dom";
import "./styles.css";

/* eslint-disable */

export const ShoppingCartAside = ({ toggle, cartItems }) => {
  return (
    <aside className=" shopping-aside flex flex-col fixed right-0 bg-white  border-2 rounded  z-20 p-6">
      <section className="flex items-center  justify-between">
        <h2 className=" font-medium text-xl">Carrito de compras</h2>
        <button
          className="hover:bg-slate-600"
          onClick={() => {
            toggle();
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
            className="flex flex-row justify-between border  border-[#00FFFF] rounded p-4 w-full mb-2"
          >
            <div>{el.name}</div>
            <div>${el.price}</div>
          </div>
        ))}
      </div>
      <button
        type="button"
        className=" bg-[#00FFFF] hover:bg-cyan-200 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-4 mx-auto w-full"
      >
        <Link to="/checkout">Pagar</Link>
      </button>
    </aside>
  );
};
