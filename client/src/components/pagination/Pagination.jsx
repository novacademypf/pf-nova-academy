import { useDispatch, useSelector } from "react-redux";
import ButtonPagination from "./ButtonPagination";
import { getAllCourses } from "../../redux/actions/coursesActions";
import ReactPaginate from "react-paginate";

const Pagination = () => {
  const {courseCount}= useSelector((state)=>state.coursesReducer.courses)

  const dispatch = useDispatch();
  const handlePageClick = (page) => {
    

    dispatch(getAllCourses(Number(page.selected+1)));
  };
  return (
    <div className="w-[calc(100%-15em)]  left-[15em] bg-white h-14 fixed z-30  flex justify-center items-center gap-2 ">
     
      <ReactPaginate
        breakLabel="..."
        nextLabel="next"
        nextClassName='font-bold'
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={3}
        pageCount={ Math.ceil(courseCount / 10)}
        containerClassName={"flex bg-white drop-shadow-lg rounded-[1em] px-4 py-2 jusify-center items-center gap-2"}
        pageClassName={
          "w-[1.5em] h-[1.5em]  rounded-[50%] flex items-center justify-center"
        }
        pageLinkClassName={
          "w-[1.5em] h-[1.5em] rounded-[50%] flex items-center font-bold  justify-center  "
        }
        activeClassName='bg-blue-600 text-white'
       
        breakClassName='flex items-center justify-center '
        breakLinkClassName="font-bold pointer-events-none"
        previousLabel="prev"
        previousLinkClassName='font-bold'
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
