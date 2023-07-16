import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../Layout/index";
import Swal from "sweetalert2";
import { useEffect } from "react";

const PaymentResponse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get("status");

  const handleModal = () => {
    return Swal.fire({
      icon: status === "ok" ? "success" : "error",
      title:
        status === "ok" ? "Pago procesado exitosamente" : "Pago no exitoso",

      confirmButtonText: "OK",
      backdrop: "static",
      allowOutsideClick: false,
    }).then((res) => {
      if (res.isConfirmed) {
        navigate("/home");
      }
    });
  };
  useEffect(() => {
    handleModal();
  }, []);
  return <Layout></Layout>;
};

export default PaymentResponse;
