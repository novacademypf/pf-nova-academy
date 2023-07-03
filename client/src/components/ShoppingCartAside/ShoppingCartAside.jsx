import "./styles.css";
export const ShoppingCartAside = () => {
  return (
    <aside className=" shopping-aside flex flex-col fixed right-0 bg-white  border-2 rounded  z-20">
      <section className="flex items-center  justify-between p-6">
        <h2 className=" font-medium text-xl">Carrito de compras</h2>
        <button className="hover:bg-slate-600">
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
    </aside>
  );
};
