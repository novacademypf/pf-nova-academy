import { useNavigate } from "react-router-dom";
import { loginUserGoogle } from "../services/loginUserRequest";
import { useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";

export const useGoogleAuth = () => {
  const [errorsDb, setErrorsDb] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (errorsDb.error) {
      setShowModal(true);
    }
  }, [errorsDb]);
  const success = async (codeResponse) => {
    try {
    } catch (error) {
      error.response.status === 409 && setErrorsDb(error.response.data);
    }
    console.log(codeResponse);
    const response = await loginUserGoogle(codeResponse.access_token);
    localStorage.setItem("token", response.data.token);
    console.log("test token login",response.data.token);
    response.data.token && response.status === 200 && navigate("/");
  };
  const error = () => {
    console.log("login failed");
  };
  const login = useGoogleLogin({
    onSuccess: success,
    onError: error,
  });

  return { login, errorsDb, showModal, setShowModal };
};
