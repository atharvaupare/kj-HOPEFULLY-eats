/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const SearchComponent = ({ setIsTyping, setSearchText, searchText }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="w-screen px-5 pt-5">
      <div className="w-full h-[50px] bg-[#F5F5F5] rounded-md flex items-center px-4 gap-3">
        <SearchOutlinedIcon sx={{ fontSize: 21 }} />
        <input
          ref={inputRef}
          type="text"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setIsTyping(true);
          }}
          className="w-full h-full bg-transparent outline-none"
          placeholder="Search for dishes..."
        />
      </div>
    </div>
  );
};

export default SearchComponent;