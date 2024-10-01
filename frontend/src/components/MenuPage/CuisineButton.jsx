/* eslint-disable react/prop-types */
import loremPicsum from "lorem-picsum";

const CuisineButton = ({selected}) => {
  return (
    <div className={`h-[95px] w-[100px] rounded-lg mt-5 ${!selected ? 'bg-[#EFEEEE]' : 'bg-[#462B9C]'} flex justify-center items-center`}>
      <img src={loremPicsum({width: 85, random: true})} alt="" className="rounded-full"/>
    </div>
  )
}

export default CuisineButton
