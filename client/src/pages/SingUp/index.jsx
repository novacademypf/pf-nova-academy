import axios from "axios";
import { useState } from "react";
import { connect } from "react-redux";
import {
  signUpSuccess,
  signUpFailure,
  checkEmailExistence,
} from "../../redux/actions/userActions";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const SignUp = ({
  checkEmailExistence,
  signUpSuccess,
  signUpFailure,
  isCheckingEmail,
  emailError,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Realizar la validación del email antes de enviar la solicitud al servidor
    checkEmailExistence(email);

    if (!validatePassword(password)) {
      setPasswordError(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número"
      );
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/user/singup",
        {
          name,
          email,
          password,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      Swal.fire({
        icon: "success",
        title: "Registro completo",
        text: "Creaste tu cuenta ahora puedes ingresar",
        confirmButtonText: "OK",
        backdrop: "static",
        allowOutsideClick: false,
      }).then((res) => {
        if (res.isConfirmed) {
          navigate("/home");
        }
      });

      const user = response.data;
      signUpSuccess(user);
      setName("");
      setEmail("");
      setPassword("");
      setPasswordError("");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ya existe un usuario con este email registrado",
      });

      signUpFailure(error);
      console.error("Error al registrar", error);
    }
  };

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold mb-4">Registro</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-gray-600">Nombre:</label>
              <input
                className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                type="text"
                value={name}
                onChange={handleNameChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="text-gray-600">Email:</label>
              <input
                className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              {isCheckingEmail && (
                <p className="text-red-500 text-xs mt-1">
                  Verificando email...
                </p>
              )}
              {!isCheckingEmail && emailError && (
                <p className="text-red-500 text-xs mt-1">{emailError}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="text-gray-600">Contraseña:</label>
              <input
                className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              {passwordError && (
                <p className="text-red-500 text-xs mt-1">{passwordError}</p>
              )}
            </div>

            <button
            className=" bg-[#00FFFF] hover:bg-cyan-200 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"              
            type="submit"
            >
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    isCheckingEmail: state.userReducer.isCheckingEmail,
    emailError: state.userReducer.emailError,
  };
};

export default connect(mapStateToProps, {
  signUpSuccess,
  signUpFailure,
  checkEmailExistence,
})(SignUp);