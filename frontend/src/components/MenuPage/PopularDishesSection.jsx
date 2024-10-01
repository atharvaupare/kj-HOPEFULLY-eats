import HomeScreenDishCard from "./HomeScreenDishCard";

const PopularDishesSection = () => {
    let arr = ['Vada Pav', 'Pav Bhaji', 'Paneer Rice', 'Samosa Pav']
  return (
    <div className='w-full h-full grid grid-cols-2 mt-2 gap-2'>
      {arr.map((item, key) => <HomeScreenDishCard name={item} key={key}/>)}
    </div>
  )
}

export default PopularDishesSection
