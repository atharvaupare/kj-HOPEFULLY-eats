/* eslint-disable react/prop-types */
import Header from "../components/MenuPage/Header";
import Searchbar from "../components/MenuPage/Searchbar";
import CuisineButton from "../components/MenuPage/CuisineButton";
import SpecialBanner from "../components/MenuPage/SpecialBanner";
import PopularDishesSection from "../components/MenuPage/PopularDishesSection";
import AllImage from "../assets/all.webp";
import { useState, useEffect } from "react";

const MainMenu = () => {
  const [selectedOption, setSelectedOption] = useState("All");
  const [cuisines, setCuisines] = useState([]);

  useEffect(() => {
    // Fetch cuisines from the API
    const fetchCuisines = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/cuisines?populate=*"
        );
        const data = await response.json();
        console.log(data.data);
        if (data && data.data) {
          setCuisines(data.data);
        }
      } catch (error) {
        console.error("Error fetching cuisines:", error);
      }
    };

    fetchCuisines();
  }, []);

  return (
    <div className="w-full h-full pb-[85px] flex flex-col items-center overflow-y-auto bg-[#F5F5F5]">
      <Header />
      <Searchbar />

      <div className="w-full px-5 mt-5">
        <div className="flex gap-4 overflow-x-auto pb-4 w-full no-scrollbar">
          <CuisineWrapper
            name="All"
            selected={selectedOption === "All"}
            set={setSelectedOption}
            image={AllImage}
          />

          {cuisines.map((cuisine) => (
            <CuisineWrapper
              key={cuisine.attributes.id}
              name={cuisine.attributes.name}
              selected={selectedOption === cuisine.attributes.name}
              set={setSelectedOption}
              image={cuisine.attributes.image.data.attributes}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col mt-5 px-5">
        <h2 className="text-2xl mb-3">Today's Specials</h2>
        <SpecialBanner />
      </div>

      <div className="w-full flex flex-col mt-5 px-5">
        <h2 className="text-2xl mb-3">Popular</h2>
        <PopularDishesSection selectedCuisine={selectedOption} />
      </div>
    </div>
  );
};

const CuisineWrapper = ({ name, selected = false, set, image }) => {
  // console.log(image);
  return (
    <div
      className="flex flex-col items-center gap-1 flex-shrink-0"
      onClick={() => set(name)}
    >
      <CuisineButton selected={selected} image={image} name={name}/>
      <span className="text-sm">{name}</span>
    </div>
  );
};

export default MainMenu;
