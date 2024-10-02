import React from "react";
import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthState from "./context/AuthState";
import routes from "./routes/routes";
import CartState from "./context/CartState";

const App = () => {
  const routings = createBrowserRouter(routes);

  return (
    <div>
      <CartState>
        <AuthState>
          <RouterProvider router={routings}></RouterProvider>
        </AuthState>
      </CartState>
    </div>
  );
};

export default App;
