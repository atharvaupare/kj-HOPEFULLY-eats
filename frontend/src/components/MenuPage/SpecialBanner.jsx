import loremPicsum from "lorem-picsum";


const SpecialBanner = () => {
  return (
    <div className="w-[90vw] h-[140px] rounded-3xl bg-gradient-to-r from-[#9577f2] to-[#a085f7] mt-5 flex items-center justify-between">
      <div className="text-white ml-4">
        <h2 className="text-lg">Today's Offer</h2>
        <p className="text-xl font-semibold">Special Pav Bhaji</p>
        <p>Rs. 150</p>
      </div>
      <img src={loremPicsum({width: 120, height: 110, random: true})} alt="" className="mr-4 rounded-xl"/>
    </div>
  )
}

export default SpecialBanner
