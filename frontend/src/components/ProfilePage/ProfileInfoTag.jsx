/* eslint-disable react/prop-types */

const ProfileInfoTag = ({ head, desc, icon1, icon2, onClick }) => {
  return (
    <div onClick={onClick} className="w-[90%] h-[80px] bg-white flex gap-3 items-center justify-between">
      <div className="flex gap-3">
        <div className="size-[50px] bg-[#F0F0F8] rounded-full flex justify-center items-center ml-2">
          {icon1}
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-[16px]">{head}</span>
          {desc && <span className="text-xs text-[#6F6D6D]">{desc}</span>}
        </div>
      </div>
      <div className="mr-2 transition-all">{icon2}</div>
    </div>
  );
};

export default ProfileInfoTag;
