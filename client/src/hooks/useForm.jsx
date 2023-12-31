import { useEffect, useState } from "react";
import { validate } from "../helpers/validateSingIn";
import { loginUser } from "../services/loginUserRequest";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProfile } from "../redux/actions/profileActions";
import Swal from "sweetalert2";

export const useForm = (dataValue) => {
  const [showModal, setShowModal] = useState(false);
  const [valueInput, setValueInput] = useState(dataValue);
  const [errors, setErrors] = useState({});
  const [errorsDb, setErrorsDb] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (valueInput.isCheked) {
      window.localStorage.setItem("username", valueInput.email);
      window.localStorage.setItem("password", valueInput.password);
    } else {
      window.localStorage.removeItem("username");
      window.localStorage.removeItem("password");
    }
  }, [valueInput.isCheked]);
  useEffect(() => {
    if (errorsDb.error === "user not found") {
      setShowModal(true);
    }
  }, [errorsDb]);
  const handleOnChange = (e) => {
    const { value, name, type, checked } = e.target;
    if (type === "checkbox") setValueInput({ ...valueInput, [name]: checked });
    else setValueInput({ ...valueInput, [name]: value });
    const validationErrors = validate({ ...valueInput, [name]: value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationErrors[name],
    }));
  };

  const handleOnBlur = (e) => {
    const { name, value } = e.target;
    const validationErrors = validate({ ...valueInput, [name]: value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationErrors[name],
    }));
  };

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      const user = await loginUser(valueInput);
      localStorage.setItem("token", user.data);
      dispatch(getProfile());
      user.status === 200 && navigate("/");
    } catch (error) {
      error.response.status === 404 && Swal.fire({
        title: 'Error',
        text: "Usuario no encontrado",
        icon: 'error',
      });;
      error.response.status === 401 && Swal.fire({
        title: 'Error',
        text: "Contraseña invalida",
        icon: 'error',
      });;
      error.response.status === 403 && console.error(error.response.data);
      error.response.status === 423 && Swal.fire({
        title: 'Error',
        text: "Usuario Baneado",
        icon: 'error',
      });;
    }
  };

  return {
    handleOnChange,
    handleOnBlur,
    valueInput,
    errors,
    errorsDb,
    handleOnSubmit,
    setShowModal,
    showModal,
  };
};
