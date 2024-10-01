import Landing from "../pages/Landing";
import HomePage from "../pages/HomePage"
import MainMenu from "../pages/MainMenu";

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
      }
    ],
  },
];

export default routes;
