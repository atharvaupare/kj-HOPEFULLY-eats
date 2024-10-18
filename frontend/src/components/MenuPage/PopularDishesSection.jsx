/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import HomeScreenDishCard from "./HomeScreenDishCard";

const PopularDishesSection = ({ selectedCuisine }) => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/menu-items?populate=*"
        );
        const data = await response.json();
        console.log(data.data);
        if (data && data.data) {
          setDishes(data.data);
        }
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };

    fetchDishes();
  }, []);

  const filteredDishes =
    selectedCuisine === "All"
      ? dishes
      : dishes.filter((dish) => {
          console.log(
            "Dish inside filter:",
            dish.attributes.cuisine.data.attributes.name
          ); // Log each dish
          return (
            dish.attributes.cuisine.data.attributes.name === selectedCuisine
          );
        });

  const limitedDishes = filteredDishes.slice(0, 4);

  return (
    <div className="w-full h-full grid grid-cols-2 my-5 gap-5">
      {limitedDishes.map((dish) => (
        <HomeScreenDishCard
          name={dish.attributes.name}
          price={dish.attributes.price}
          key={dish.id}
          image={dish.attributes.image.data.attributes}
          description={dish.attributes.description}
          rating={dish.attributes.rating}
          dish
        />
      ))}
    </div>
  );
};

export default PopularDishesSection;
