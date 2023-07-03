const ButtonPagination = ({ value ,onClick}) => {

  return (
    <button className=" h-[2.1em] w-[2.1em] bg-yellow-300 flex  text-white font-bold items-center justify-center  rounded-[50%]" onClick={onClick}>
      {value}
    </button>
  );
};

export default ButtonPagination;
