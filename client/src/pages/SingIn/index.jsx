import jwt_decode from "jwt-decode";
import { gapi } from "gapi-script";
import { FormSingIn } from "../../components/formSingIn/Formulario";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";
import { loginUserGoogle } from "../../services/loginUserRequest";
import { useState, useEffect} from "react";
import GoogleLogin from "./GoogleLogin";

/* eslint-disable */
// import { useHistory } from 'react-router-dom';
// https://accounts.google.com/gsi/select?client_id=50733054185-1gaasavkm9laqosq23fv4qpv3ov62fgu.apps.googleusercontent.com&ux_mode=popup&ui_mode=card&as=xHsHkLjUndEoqG7j2Z0Y0g&channel_id=bfc9a4035c547900d3f09ca5650ab51f549424ff1bec86741104b787b4357ea9&origin=http%3A%2F%2Flocalhost%3A5173
/* https://accounts.google.com/gsi/select?client_id=50733054185-1gaasavkm9laqosq23fv4qpv3ov62fgu.apps.googleusercontent.com&ux_mode=popup&ui_mode=card&as=C%2B%2Fqu3qu4TMEYgmi14%2F20Q&channel_id=016f8665d743109228f3d9a9e5667e52506da28c40fc341974d89c42207ec0d0&origin=https%3A%2F%2F36gyt9.csb.app */
const SingIn = () => {
  // const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false); // Estado para controlar la redirección
  const [error, setError] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Aquí puedes realizar la lógica de inicio de sesión, como validar los datos ingresados y hacer una llamada a la base de datos.

    // Por ejemplo, podrías enviar una solicitud al backend para verificar las credenciales del usuario:
    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // manejo la respeusta del back
        if (data.success) {
          setLoggedIn(true);
          // history.push('/otra-pagina'); // defino el estado loggedIn en true para redirigir al usuario
        } else {
          setError("Usuario incorrecto"); // Manejo el caso de inicio de sesión fallido
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  if (loggedIn) {
    return <redirect to="/" />; // Redirecciona a la pagina de perfil-home con sus datos
  }
  ;
  const clientID =
    "1025111478798-qcpl6unb1c4j99cpnf86ts4p75a4llm5.apps.googleusercontent.com";
  const [user, setUser] = useState({});
  const [loggeIn, setLoggetInfo] = useState(false);

  const onSuccess = (response) => {
    console.log(response);
    console.log(response.profileObj);
    console.log(response.profileObj.email);
    console.log(response.profileObj.name);
  };
  const onFailure = (response) => {
    console.log("Something went wrong");
  };
  const handleLogout = () => {
    setUser({});
  };
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientID,
      });
    }
    gapi.load("client:auth2", start);
  });

  return (
    <section className="h-[calc(100vh-4.1em)] flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0  border-neutral-800">
      <div className="md:w-1/3 max-w-sm ">
        <img
          src="https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?s=612x612&w=0&k=20&c=9HWSuA9IaU4o-CK6fALBS5eaO1ubnsM08EOYwgbwGBo="
          alt="Sample image"
        />
      </div>
      <div className="md:w-1/3 max-w-sm flex-col gap-4 ">
        <div className="text-5xl font-bold flex flex-col gap-4">
          <h1 className=" text-2xl  md:text-2xl text-center  text-neutral-700">
            Inicia session en tu cuenta Nova Cademy
          </h1>
          <GoogleLogin />
        </div>

  
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
            Or
          </p>
        </div>
        <FormSingIn />
      </div>
    </section>
  );
};

export default SingIn;
