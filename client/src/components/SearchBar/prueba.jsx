const Prueba = ({handleEnter,handleChange,term}) => {
    return (
        <form className="flex items-center mb-8 relative">
          <label htmlFor="simple-search" className="sr-only">
            Buscar curso ...
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-[#00FFFF] text-gray-900 text-sm rounded-lg focus:ring-[#00FFFF] focus:shadow-lg focus:shadow-[#00FFFF]/50 block w-full pl-10 p-2.5 "
              placeholder="Buscar curso"
              onChange={handleChange}
              value={term}
              onKeyDown={(e) => {
                handleEnter(e);
              }}
              required
            />
          </div>
          <button
            type="submit"
            className="p-2.5 ml-2 text-sm font-medium text-gray-900 bg-[#00FFFF] rounded-lg border  hover:bg-cyan-200 focus:ring-4 focus:outline-none focus:ring-blue-300 "
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <span className="sr-only">Buscar curso...</span>
          </button>
        </form>  );
}
 
export default Prueba;