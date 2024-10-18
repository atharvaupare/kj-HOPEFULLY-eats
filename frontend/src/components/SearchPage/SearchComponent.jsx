/* eslint-disable react/prop-types */
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const SearchComponent = ({ setIsTyping, searchText, setSearchText }) => {
  return (
    <div className="w-full h-[50px] mt-3 flex items-center gap-2 px-5">
      <SearchOutlinedIcon
        sx={{ fontSize: 25, color: "gray" }}
        className="mr-2"
      />
      <input
        type="text"
        className="p-2 w-[75%] h-full outline-none text-lg"
        placeholder="Search"
        onFocus={()=>setIsTyping(true)}
        onChange={(e)=>setSearchText(e.target.value)}
        value={searchText}
      />
      <span className="text-sm hover:text-gray-600" onClick={()=>setSearchText("")}>Cancel</span>
    </div>
  );
};

export default SearchComponent;
