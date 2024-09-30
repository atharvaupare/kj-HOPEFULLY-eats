import { useState } from "react";
import authContext from "./authContext";

const AuthState = (props) => {
  const [user, setUser] = useState([
    {
      username: "test user",
      address: "test",
    },
    {
      username: "test user 2",
      address: "test 2",
    },
  ]);

  return (
    <authContext.Provider value={{ user, setUser }}>
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
