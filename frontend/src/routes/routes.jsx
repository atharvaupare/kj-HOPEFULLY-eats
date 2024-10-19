import Landing from "../pages/Landing";
import HomePage from "../pages/HomePage"
import MainMenu from "../pages/MainMenu";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import ProfilePage from "../pages/ProfilePage";
import SearchPage from "../pages/SearchPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

const routes = [
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/homepage",
    element: <HomePage />,
    children: [
      {
        path: "",
        element: <MainMenu />, 
      },
      {
        path: "search/:text?",
        element: <SearchPage />, 
      },
      {
        path: "profile",
        element: <ProfilePage />, 
      },
      {
        path: "cart",
        element: <CartPage />, 
      },
    ],
  },
  {
    path: "/item/:name/:price",
    element: <ProductPage />,
  },
];

export default routes;
