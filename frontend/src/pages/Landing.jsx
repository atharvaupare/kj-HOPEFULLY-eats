import { NavLink } from "react-router-dom";

const Landing = () => {
  return (
    <div className="w-screen h-[100vh] bg-gradient-to-b from-[#462b9c] to-[#644ab5] flex justify-center items-center overflow-hidden">
      <div className="h-[60vh] md:h-[60vh] w-[90vw] flex flex-col justify-between items-center">
        <div className="size-[240px] rounded-full overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          <img
            src="https://img.freepik.com/free-photo/delicious-burger-with-fresh-ingredients_23-2150857908.jpg"
            alt="Delicious Burger"
            className="w-full h-full object-cover object-[center_30%]"
          />
        </div>
        <div className="flex flex-col gap-5">
          <div className="text-white text-4xl font-sans text-center font-semibold">
            <h1>KJ</h1>
            <h1>Eats.</h1>
          </div>
          <NavLink to="/homepage">
            <button
              className="rounded-md bg-white text-[#462b9c] text-xl py-2 px-5 cursor-pointer hover:scale-105 hover:bg-[#462b9c] hover:text-white"
              type="button"
            >
              Get Started
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Landing;
