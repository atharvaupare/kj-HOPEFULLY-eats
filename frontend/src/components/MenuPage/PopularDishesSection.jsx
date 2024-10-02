import { useEffect, useState } from "react";
import HomeScreenDishCard from "./HomeScreenDishCard";

const PopularDishesSection = ({ selectedCuisine }) => {
  // let arr = [
  //   { name: "Vada Pav", price: 20 },
  //   { name: "Pav Bhaji", price: 50 },
  //   { name: "Paneer Rice", price: 40 },
  //   { name: "Samosa Pav", price: 20 },
  // ];

  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    // Fetch menu items from the API
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

  console.log(selectedCuisine);
  const filteredDishes =
    selectedCuisine === "All"
      ? dishes
      : dishes.filter((dish) => dish.cuisine.name === selectedCuisine);
  console.log(filteredDishes);

  return (
    <div className="w-full h-full grid grid-cols-2 my-5 gap-5">
      {filteredDishes.map((dish) => (
        <HomeScreenDishCard
          name={dish.name}
          price={dish.price}
          key={dish.id}
          image={dish.image}
          description={dish.description}
          dish
        />
      ))}
    </div>
  );
};

export default PopularDishesSection;
