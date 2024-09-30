import React from "react";
import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthState from "./context/AuthState";
import routes from "./routes/routes";

const App = () => {
  const routings = createBrowserRouter(routes);

  return (
    <div>
      <AuthState>
        <RouterProvider router={routings}></RouterProvider>
      </AuthState>
    </div>
  );
};

export default App;
