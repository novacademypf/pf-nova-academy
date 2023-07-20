import { useEffect } from "react";
import { useRoutes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "./redux/actions/coursesActions";
import Admin from "./pages/Admin/Admin";
import Checkout from "./pages/Checkout";
import Courses from "./pages/Courses";
import Landing from "./pages/Landing";
import MyAccount from "./pages/MyAccount";
import NotFound from "./pages/NotFound";
import SingIn from "./pages/SingIn";
import SingUp from "./pages/SingUp";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Detail from "./pages/Detail";
import About from "./pages/About";
import ContactForm from "./pages/ContactForm/ContactForm";
import CoursesCreated from "./pages/MyAccount/CoursesCreated";
import axios from "axios";
axios.defaults.baseURL = 'https://pf-nova-academy-production.up.railway.app'
/*import axios from "axios";
axios.defaults.baseURL = 'https://pf-nova-academy-production.up.railway.app/'*/

/* import { SearchCourse } from "./pages/SearchCourse/SearchCourse"; */
import AdminHome from "./pages/AdminHome/AdminHome";
import CreateCourse from "./pages/CreateCourse";
import { SearchCourse } from "./pages/SearchCourse/SearchCourse";
import PaymentResponse from "./pages/PaymentResponse/PaymentResponse";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import MyOrders from "./pages/MyOrders/MyOrders";
import { addFromStorage } from "./redux/actions/shoppingCartActions";

const App = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profileReducer.userProfile);
  const prevLocalCart = JSON.parse(localStorage.getItem("shoppingCart"));

  useEffect(() => {
    dispatch(getAllCourses());
    //dispatch(getProfile());
    prevLocalCart && dispatch(addFromStorage(prevLocalCart));
  }, []);

  const AppRouter = () => {
    const location = useLocation();

    // Condición para no renderizar el Navbar en las rutas de AdminHome y Admin
    const hideNavbarRoutes = ["/admin", "/adminhome"];
    const shouldRenderNavbar = !hideNavbarRoutes.includes(location.pathname);

    let routes = useRoutes([
      { path: "/", element: <Landing /> },
      { path: "/home", element: <Home /> },
      { path: "/admin", element: <Admin /> },
      { path: "/adminhome", element: <AdminHome /> },
      {
        path: "/checkout",
        element: <PrivateRoute element={<Checkout />} auth={userProfile} />,
      },
      { path: "/courses", element: <Courses /> },
      {
        path: "/myorders",
        element: <PrivateRoute element={<MyOrders />} auth={userProfile} />,
      },
      {
        path: "/account",
        element: <MyAccount />,
      },
      { path: "/login", element: <SingIn /> },
      { path: "/register", element: <SingUp /> },
      { path: "/detail/:courseId", element: <Detail /> },
      {
        path: "/create",
        element: <CreateCourse />,
      },
      { path: "/search", element: <SearchCourse /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <ContactForm /> },
      {
        path: "/courses-created/:id",
        element: <CoursesCreated />,
      },
      {
        path: "/courses-purchased/:id",
        element: <CoursesCreated />,
      },
      {
        path: "/paymentresponse",
        element: <PaymentResponse />,
      },

      { path: "/*", element: <NotFound /> },
    ]);

    return (
      <>
        {shouldRenderNavbar && <NavBar />}
        {routes}
      </>
    );
  };

  return <AppRouter />;
};

export default App;
