import Landing from "../pages/Landing";
import HomePage from "../pages/HomePage"
import MainMenu from "../pages/MainMenu";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import ProfilePage from "../pages/ProfilePage";

const routes = [
  {
    path: "/",
    element: <Landing />,
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
        path: "profile",
        element: <ProfilePage />, 
      },
      {
        path: "cart",
        element: <CartPage />, 
      }
    ],
  },
  {
    path: "/item/:name/:price",
    element: <ProductPage />,
  },
];

export default routes;
