import { Link } from "react-router-dom";

const Banner = () => {
  const token = localStorage.getItem("token");
  return (
    <div className=" w-full h-1/2  px-6 xl:px-0 ">
      <div className="flex items-center justify-between  max-w-screen-xl h-auto md:flex-row flex-col py-12 space-y-6 md:space-y-0 w-full">
        <div className="hidden md:block ">
          <img
            className="hidden xl:block w-full "
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4pOp92Ya6Lu80jfreWN91Hs0V9hv08APDlg&usqp=CAU"
            alt="behzad-ghaffarian-nh-Wg-ZNV85-LQ-unsplash-1-1"
          />
          <img
            className="xl:hidden w-full "
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbGQPlPGcbOlH7UgiV_UKekHuw3FGDXD0K0c1IS6kKUbCbxuPo62qs1DTTbA5lCYxew9w&usqp=CAU"
            alt="behzad-ghaffarian-nh-Wg-ZNV85-LQ-unsplash-1-1-1"
          />
        </div>
        <div className="flex justify-center items-center flex-col xl:w-2/5 md:px-6 sm:w-3/4 md:w-2/4">
          <div className="">
            <h1 className="xl:text-4xl text-3xl font-semibold leading-9 text-gray-800">
              Aprende y enseña
            </h1>
          </div>
          <div className="mt-4">
            <p className="xl:text-xl text-base leading-7 text-center text-gray-600">
              Ahora podes comprar el cursos que estas buscando y tambien vender
              tus propios cursos{" "}
            </p>
          </div>
          <div className="mt-8 flex justify-center items-center w-full">
            {!token ? (
              <button
                type="button"
                className=" bg-[#00FFFF] hover:bg-cyan-200 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                <Link to="/register">Registrate</Link>
              </button>
            ) : (
              <button
                type="button"
                className=" bg-[#00FFFF] hover:bg-cyan-200 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                <Link to="/courses">Ver cursos</Link>
              </button>
            )}
          </div>
        </div>
        <div className="flex md:w-auto w-full justify-center flex-row space-x-4 md:space-x-0">
          <div className="w-full">
            <img
              className="hidden xl:block w-full "
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQauRfX2nuYPCNCvTMPolIUu4jM9IWHG39SyK9swwecr2nqkmwkgYKLH3I_bqM7_cYyvAg&usqp=CAU"
              alt="behzad-ghaffarian-nh-Wg-ZNV85-LQ-unsplash-1-1"
            />
            <img
              className="xl:hidden w-full"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQauRfX2nuYPCNCvTMPolIUu4jM9IWHG39SyK9swwecr2nqkmwkgYKLH3I_bqM7_cYyvAg&usqp=CAU"
              alt="sven-brandsma-Qz6-Zx4-Rjd-D8-unsplash-1"
            />
          </div>
          <div className="md:hidden w-full">
            <img
              className="hidden xl:block "
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4pOp92Ya6Lu80jfreWN91Hs0V9hv08APDlg&usqp=CAU"
              alt="behzad-ghaffarian-nh-Wg-ZNV85-LQ-unsplash-1-1"
            />
            <img
              className="xl:hidden w-full"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbGQPlPGcbOlH7UgiV_UKekHuw3FGDXD0K0c1IS6kKUbCbxuPo62qs1DTTbA5lCYxew9w&usqp=CAU"
              alt="behzad-ghaffarian-nh-Wg-ZNV85-LQ-unsplash-1-1-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
