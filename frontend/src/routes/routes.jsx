import Landing from "../pages/Landing";
import HomePage from "../pages/HomePage"
import MainMenu from "../pages/MainMenu";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";

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
        path: "cart",
        element: <CartPage />, 
      }
    ],
  },
  {
    path: "/item",
    element: <ProductPage />,
  },
];

export default routes;
