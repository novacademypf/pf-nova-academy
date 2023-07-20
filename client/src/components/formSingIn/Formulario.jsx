import { Link } from "react-router-dom";
import { Input } from "./inputForm";
import { useForm } from "../../hooks/useForm";
import ModalErrorForm from "./ModalErrorForm";

const objForm = { email: "", password: "" };
export const FormSingIn = () => {
  const {
    handleOnChange,
    handleOnBlur,
    handleOnSubmit,
    valueInput,
    errors,
    setShowModal,
    showModal,
  } = useForm(objForm);

  return (
    <form onSubmit={handleOnSubmit} className=" flex flex-col gap-2">
      <Input
        name={"email"}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        valueLabel={"Correo electronico"}
        value={valueInput.email}
      />
      {errors.email && (
        <p className="text-red-600 text-xs italic">{errors.email}</p>
      )}
      <Input
        name={"password"}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        valueLabel={"Contraseña"}
        value={valueInput.password}
        type='password'
      />
      {errors.password && (
        <p className="text-red-600 text-xs italic">{errors.password}</p>
      )}

      <div className=" flex justify-between font-semibold text-sm">
      

        <a
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="#"
        >
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      <div className="flex  ">
        <button
className=" bg-[#00FFFF] hover:bg-cyan-200 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"          onClick={handleOnSubmit}
        >
          Iniciar sesión
        </button>
      </div>

      <p className=" text-sm font-semibold">
        ¿No tienes una cuenta?
        <Link
          className={
            "text-blue-500 font-bold transition duration-150 ease-in-out hover:text-blue-700 focus:text-blue-500 active:text-danger-700 mx-2"
          }
          to="/register"
        >
          Registrarse
        </Link>
      </p>
      {showModal && (
        <ModalErrorForm
          showModal={showModal}
          text={
            "No se encontraron credenciales. ¿Te gustaría crear una cuenta?"
          }
          setShowModal={setShowModal}
        />
      )}
    </form>
  );
};