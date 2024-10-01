import loremPicsum from "lorem-picsum";
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';

const HomeScreenDishCard = ({name}) => {
  return (
    <div className="h-[220px] w-[170px] bg-gradient-to-b from-[#EBE8E8] to-[#EFEEEE] flex flex-col justify-between items-center py-4 rounded-3xl">
      <div className="w-full flex flex-col justify-center items-center gap-2">
        <img src={loremPicsum({width: 120, height: 120, random: true})} alt="" className="rounded-lg"/>
        <h2>{name}</h2>
      </div>

      <div className="w-[70%] flex justify-between">
        <p>Rs. 20</p>
        <ControlPointOutlinedIcon sx={{color: '#0E803C'}}/>
      </div>
    </div>
  );
};

export default HomeScreenDishCard;
