import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const PrivateRoute = ({ auth, element }) => {
  const navigate = useNavigate();
  const handleModal = () => {
    if (!auth) {
      return Swal.fire({
        icon: "warning",
        title: "Debe iniciar sesión ",
        confirmButtonText: "OK",
        backdrop: "static",
        allowOutsideClick: false,
      }).then((res) => {
        if (res.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };
  useEffect(() => {
    handleModal();
  }, []);
  return auth && element;
};

export default PrivateRoute;
