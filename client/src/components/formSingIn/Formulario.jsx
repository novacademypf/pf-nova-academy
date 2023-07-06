import { Link, NavLink } from "react-router-dom";
import { Input } from "./inputForm";
import { useForm } from "../../hooks/useForm";
import ModalErrorForm from "./ModalErrorForm";
import { Checkbox } from "flowbite-react";
import { useEffect } from "react";

const objForm = { email: "", password: "", isCheked: false };
export const FormSingIn = () => {
  const {
    handleOnChange,
    handleOnBlur,
    handleOnSubmit,
    valueInput,
    errors,
    setShowModal,
    showModal,
    errorsDb
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
      />
      {errors.password && (
        <p className="text-red-600 text-xs italic">{errors.password}</p>
      )}

      <div className=" flex justify-between font-semibold text-sm">
        <Input
          name={"isCheked"}
          type={"checkbox"}
          onChange={handleOnChange}
          checked={valueInput.isCheked}
          valueLabel={"terminos y condiciones"}
        />

        <a
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="#"
        >
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      <div className="flex  ">
        <button
          className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold p-2 rounded-lg focus:outline-none focus:shadow-outline"
          onClick={handleOnSubmit}
        >
          Iniciar sesión
        </button>
      </div>

      <p className=" text-sm font-semibold">
        ¿No tienes una cuenta?
        <NavLink
          className={
            "text-blue-500 font-bold transition duration-150 ease-in-out hover:text-blue-700 focus:text-blue-500 active:text-danger-700"
          }
        >
         {' '}Registrarse
        </NavLink>
      </p>
      {showModal && (
        <ModalErrorForm showModal={showModal} text={errorsDb.error} setShowModal={setShowModal} />
      )}
    </form>
  );
};
