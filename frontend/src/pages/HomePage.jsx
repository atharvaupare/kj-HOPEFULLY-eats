import { Outlet } from "react-router-dom";
import BottomNav from "../components/BottomNav";

const HomePage = () => {
  return (
    <div className="w-screen h-[100vh] flex flex-col">
      <Outlet/>
      <BottomNav />
    </div>
  );
};

export default HomePage;
