import HomeScreenDishCard from "./HomeScreenDishCard";

const PopularDishesSection = () => {
    let arr = ['Vada Pav', 'Pav Bhaji', 'Paneer Rice', 'Samosa Pav']
  return (
    <div className='w-full h-full grid grid-cols-2 my-2 gap-5'>
      {arr.map((item, key) => <HomeScreenDishCard name={item} key={key}/>)}
    </div>
  )
}

export default PopularDishesSection
