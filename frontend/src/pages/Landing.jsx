import React, { useContext } from "react";
import authContext from "../context/authContext";
import Button from "@mui/material/Button";

const Landing = () => {
  const { user } = useContext(authContext);

  return (
    <>
      <div className="text-3xl bg-red-300 w-full p-4">
        {user && user.length > 0 ? (
          <ul>
            {user.map((item, index) => (
              <li key={index} className="p-4 m-2 bg-white border rounded shadow">
                <div className="font-bold">Username: {item.username}</div>
                <div className="text-gray-700">Address: {item.address}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No users available</p>
        )}
      </div>
      {/* <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button> */}
    </>
  );
};

export default Landing;
