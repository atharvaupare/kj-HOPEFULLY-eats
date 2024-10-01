/* eslint-disable react/prop-types */
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";

const AddOnCard = ({src}) => {
  return (
    <div className="size-[80px] rounded-2xl bg-[#EFEEEE] flex flex-col justify-center items-center">
        <img src={src} alt="" className="mt-6"/>
      <div className="cursor-pointer self-end">
        <ControlPointOutlinedIcon sx={{ color: "#0E803C" }} />
      </div>
    </div>
  );
};

export default AddOnCard;
