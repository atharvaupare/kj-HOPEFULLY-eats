/* eslint-disable react/prop-types */
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

const AddOnCard = ({ name, src, selectedAddOn, setSelectedAddOn }) => {
  const handleClick = () => {
    if (!selectedAddOn.includes(name)) {
      setSelectedAddOn((prev) => {
        let newPrev = [...prev];
        newPrev.push(name);
        return newPrev;
      });
    } else {
      setSelectedAddOn((prev) => prev.filter((prevName) => prevName !== name));
    }
  };

  return (
    <div
      className="size-[80px] rounded-2xl bg-[#EFEEEE] flex flex-col justify-center items-center relative overflow-hidden"
      onClick={handleClick}
    >
      <img src={src} alt="" className="w-full h-full object-cover rounded-lg" />
      <div className="cursor-pointer absolute bottom-0 right-0 p-1 bg-white">
        {selectedAddOn.includes(name) ? (
          <CheckCircleOutlineOutlinedIcon sx={{ color: "green" }} />
        ) : (
          <ControlPointOutlinedIcon sx={{ color: "black" }} />
        )}
      </div>
    </div>
  );
};

export default AddOnCard;
