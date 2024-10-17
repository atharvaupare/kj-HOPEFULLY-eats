import { useState } from "react";
import { useParams } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SearchComponent from "../components/SearchPage/SearchComponent";
import SearchResults from "../components/SearchPage/SearchResults";

const SearchPage = () => {
  const { text } = useParams();
  const search = text || ""; 
  const [recent, setRecent] = useState(["rice", "pav", "pasta", "pizza"]);
  const [isTyping, setIsTyping] = useState(Boolean(text)); // Set typing state based on whether there's a search term
  const [searchText, setSearchText] = useState(search);

  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <div className="h-[50]">
        <SearchComponent
          setIsTyping={setIsTyping}
          setSearchText={setSearchText}
          searchText={searchText}
        />
      </div>
      <div className="w-full px-5 mt-5 flex flex-col items-start">
        {isTyping && searchText.length > 0 ? (
          <SearchResults searchText={searchText} />
        ) : (
          <div className="w-full flex flex-col">
            <div className="w-full px-5 mt-5 flex justify-between">
              <span className="text-[#9FA4A1]">RECENT SEARCHES</span>
              <span
                className="text-sm text-[#8b8d8b]"
                onClick={() => setRecent([])}
              >
                CLEAR ALL
              </span>
            </div>
            <ul>
              {recent.map((item, key) => (
                <li key={key} className="p-5 flex gap-5 items-center h-[80px]">
                  <SearchOutlinedIcon sx={{ fontSize: 21 }} />
                  <span className="text-[18px]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
