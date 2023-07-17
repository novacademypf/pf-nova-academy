import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../Layout/index";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../redux/actions/ordersActions";

const PaymentResponse = () => {
  const orders = useSelector((state) => state.orderReducer.orders);

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get("status");
  const dispatch = useDispatch();

  const handleModal = () => {
    return Swal.fire({
      icon: status === "ok" ? "success" : "error",
      title:
        status === "ok" ? "Pago procesado exitosamente" : "Pago no exitoso",

      confirmButtonText: "OK",
      backdrop: "static",
      allowOutsideClick: false,
    }).then((res) => {
      if (res.isConfirmed && status !== "ok") {
        navigate("/account");
      }
    });
  };
  console.log(orders);
  useEffect(() => {
    handleModal();
    dispatch(getOrders(9));
  }, []);

  return (
    <Layout>
      {orders.map((el) => (
        <div key={el.idOrder} className="border w-96  h-auto rounded p-4 m-4">
          <div>Orden #: {el.idOrder}</div>
          <div>Status: {el.status}</div>
          <div className="flex flex-row gap-2">
            Cursos comprados:
            {el.items.map((el) => (
              <div key={el.idCourse}>{el.idCourse}</div>
            ))}
          </div>
        </div>
      ))}
    </Layout>
  );
};

export default PaymentResponse;
