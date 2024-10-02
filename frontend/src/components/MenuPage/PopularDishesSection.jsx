import HomeScreenDishCard from "./HomeScreenDishCard";

const PopularDishesSection = () => {
  let arr = [
    { name: "Vada Pav", price: 20 },
    { name: "Pav Bhaji", price: 50 },
    { name: "Paneer Rice", price: 40 },
    { name: "Samosa Pav", price: 20 },
  ];
  return (
    <div className="w-full h-full grid grid-cols-2 my-5 gap-5">
      {arr.map((item, key) => (
        <HomeScreenDishCard name={item.name} price={item.price} key={key} />
      ))}
    </div>
  );
};

export default PopularDishesSection;
