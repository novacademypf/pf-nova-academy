import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Layout";
import { useEffect } from "react";
import { getOrders } from "../../redux/actions/ordersActions";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orderReducer.orders);
  const courses = useSelector(
    (state) => state.coursesReducer.courses.courseAll
  );
  const id = localStorage.getItem("profileId");
  const coursesOrder = new Set([
    ...orders
      .map((el) => el.items.map((el) => el))
      .flat()
      .map((el) => el.idCourse),
  ]);
  const coursesOrderArray = Array.from(coursesOrder);

  const cursosComprados = courses.filter((el) =>
    coursesOrderArray.includes(el.id)
  );

  console.log(cursosComprados);

  useEffect(() => {
    dispatch(getOrders(id));
  }, []);
  return (
    <Layout>
      <h2>Mis Ordenes</h2>
      {orders
        .map((el) => (
          <div key={el.idOrder} className="border w-96  h-auto rounded p-4 m-4">
            <div>Orden #: {el.idOrder}</div>
            <div>
              Status de la compra:{" "}
              {el.payment_status === "approved" ? "Aprobado" : ""}
            </div>
            <div className="flex flex-col gap-2">
              Cursos comprados:
              {cursosComprados.map((el) => (
                <Link key={el.id} to={`/courses-purchased/${el.idCourse}`}>
                  {el.name}
                </Link>
              ))}
            </div>
          </div>
        ))
        .reverse()}
    </Layout>
  );
};

export default MyOrders;
