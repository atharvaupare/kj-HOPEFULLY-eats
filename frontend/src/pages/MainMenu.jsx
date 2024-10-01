/* eslint-disable react/prop-types */
import Header from "../components/MenuPage/Header";
import Searchbar from "../components/MenuPage/Searchbar";
import CuisineButton from "../components/MenuPage/CuisineButton";
import SpecialBanner from "../components/MenuPage/SpecialBanner";
import PopularDishesSection from "../components/MenuPage/PopularDishesSection";

const MainMenu = () => {
  return (
    <div className="w-full h-full pb-[85px] flex flex-col items-center overflow-y-auto bg-[#F5F5F5]">
      <Header />
      <Searchbar/>
      
      <div className="w-full px-5 mt-5">
        <h2 className="text-2xl mb-3">Cuisines</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 w-full">
          <CuisineWrapper name="All" selected={true} />
          <CuisineWrapper name="Chinese" />
          <CuisineWrapper name="North Indian" />
          <CuisineWrapper name="Italian" />
        </div>
      </div>
      
      <div className="w-full flex flex-col mt-5 px-5">
        <h2 className="text-2xl mb-3">Today's Specials</h2>
        <SpecialBanner />
      </div>
      
      <div className="w-full flex flex-col mt-5 px-5">
        <h2 className="text-2xl mb-3">Popular</h2>
        <PopularDishesSection />
      </div>
    </div>
  );
};

const CuisineWrapper = ({ name, selected = false }) => (
  <div className="flex flex-col items-center gap-1 flex-shrink-0">
    <CuisineButton selected={selected}/>
    <span className="text-sm">{name}</span>
  </div>
);

export default MainMenu;