import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce"; // Import your debounce hook

const Searchbar = () => {
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const debouncedText = useDebounce(text, 300); // Debounce for 300ms

  useEffect(() => {
    if (debouncedText) {
      navigate(`/homepage/search/${debouncedText}`);
    }
  }, [debouncedText, navigate]);

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <div className="relative w-[90%] h-[50px] p-3 rounded-3xl bg-[#EFEEEE] flex gap-3 text-xl items-center">
      <SearchIcon sx={{ fontSize: 20 }} />
      <input
        type="text"
        placeholder="Search"
        className="bg-[#EFEEEE] outline-none flex-grow"
        onChange={handleChange}
        value={text}
      />
    </div>
  );
};

export default Searchbar;
