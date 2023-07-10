import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Layout";
import { clearCart } from "../../redux/actions/shoppingCartActions";
import CartItem from "../../components/CartItem/CartItem";

const Checkout = () => {
  const coursesCart = useSelector((state) => state).shoppingCartReducer.cart;

  const dispatch = useDispatch();
  let totalPrice = coursesCart.reduce((acumulador, el) => {
    const subtotal = el.quantity * el.price;
    return acumulador + subtotal;
  }, 0);

  let dataToPayment = coursesCart.map((el) => {
    return {
      id: el.id,
      title: el.name,
      currency_id: "COP",
      picture_url: el.images[0],
      description: el.description,
      category_id: el.category[0],
      quantity: el.quantity,
      unit_price: el.price,
    };
  });

  const handlePayment = async (products) => {
    await axios
      .post("http://localhost:3001/mercadopago", products)
      .then(({ data }) => {
        console.log(data);
        window.location.href = data.response.body.init_point;
      })
      .catch((err) => console.log(err));
  };

  return (
    <Layout>
      <div className="flex flex-row items-center m-8 justify-between">
        <button
          className=" bg-red-500 hover:bg-cyan-200 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-4 "
          onClick={() => {
            dispatch(clearCart());
          }}
        >
          Limpiar carrito
        </button>
        <span className="font-extrabold m-4">Total compra: ${totalPrice}</span>
        <button
          type="button"
          className=" bg-[#00FFFF] hover:bg-cyan-200 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-4"
          onClick={() => {
            handlePayment(dataToPayment);
          }}
        >
          Pagar
        </button>
      </div>
      <div className="border  rounded-lg ">
        {coursesCart.map((el) => (
          <CartItem key={el.id} dataCard={el} />
        ))}
      </div>
    </Layout>
  );
};

export default Checkout;
