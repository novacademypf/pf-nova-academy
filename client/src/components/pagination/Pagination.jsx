import ButtonPagination from "./ButtonPagination";


const Pagination = () => {
  return (
    <div className="w-full h-14 bg-blue-600 fixed z-30  flex justify-center items-center gap-2 " >
      <ButtonPagination value={1}/>
      <ButtonPagination value={2}/>
      <ButtonPagination value={3}/>
      <ButtonPagination value={4}/>
      <ButtonPagination value={5}/>
      <ButtonPagination value={6}/>
    </div>
  );
};

export default Pagination;
