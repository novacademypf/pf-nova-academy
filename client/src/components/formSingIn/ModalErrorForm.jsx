import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
const ModalErrorForm = ({setShowModal,text }) => {
  const navigate = useNavigate();
  const handleCloseModal = (e) => {
    if (e.target.name === "createAccount") {
      navigate("/register");
      setShowModal(false);
    }
    setShowModal(false);
  };

  return (
    <Fragment>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
              {text}
              </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleCloseModal}
              >
                Cerrar
              </button>
              <button
                className="bg-emerald-500 text-#000 active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                name="createAccount"
                onClick={handleCloseModal}
              >
                Crear Cuenta
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </Fragment>
  );
};

export default ModalErrorForm;
