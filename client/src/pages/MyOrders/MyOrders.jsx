import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Layout";
import { useEffect } from "react";
import { getOrders } from "../../redux/actions/ordersActions";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orderReducer.orders);
  const id = localStorage.getItem("profileId");

  useEffect(() => {
    dispatch(getOrders(id));
  }, []);
  return (
    <Layout>
      <h2>Mis Ordenes</h2>
      {orders.map((el) => (
        <div key={el.idOrder} className="border w-96  h-auto rounded p-4 m-4">
          <div>Orden #: {el.idOrder}</div>
          <div>
            Status de la compra:{" "}
            {el.payment_status === "approved" ? "Aprobado" : ""}
          </div>
          <div className="flex flex-row gap-2">
            Cursos comprados:
            {el.items.map((el) => (
              <Link key={el.idCourse} to={`/courses-purchased/${el.idCourse}`}>
                {el.idCourse}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </Layout>
  );
};

export default MyOrders;
