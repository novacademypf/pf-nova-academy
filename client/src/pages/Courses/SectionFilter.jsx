


const SectionFilter = () => {
  return (
    <section className="w-[20%] bg-blue-400 h-[100vh] flex-col  justify-center">
    <div>
      <div className="bg-red-400 text-green-700 px-4 py-3 m-20">
        <button>Precios</button>
      </div>
      <input placeholder="Los mejores precios"
      className="border border-grey 300 rounded py-2 pl-5 w-full focus border-grey-400 focus: outline-none"/>
    </div>
    </section>
  );
};

export default SectionFilter;
