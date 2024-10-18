/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import SearchResultCard from "./SearchResultCard";
import useDebounce from "../../hooks/useDebounce";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import { CSSTransition } from "react-transition-group"; // For animation

const SearchResults = ({ searchText }) => {
  const [results, setResults] = useState([]);
  const [click, setClick] = useState(false); // Controls filter dropdown
  const [filter, setFilter] = useState("");  // Tracks the selected filter
  const debouncedText = useDebounce(searchText, 300);

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/menu-items?populate=*"
        );
        const data = await response.json();

        const regex = new RegExp(`\\b${debouncedText}`, "i");

        const matchedResults = data.data.filter(({ attributes }) => {
          const { name, cuisine } = attributes;
          const cuisineName = cuisine?.data?.attributes?.name || "";

          return name.match(regex) || cuisineName.match(regex);
        });

        // Sort the matched results based on the selected filter
        const sortedResults = applyFilter(matchedResults, filter);
        setResults(sortedResults);
      } catch (e) {
        console.log(e);
      }
    };

    if (debouncedText) {
      getItems();
    } else {
      setResults([]);
    }
  }, [debouncedText, filter]);

  const applyFilter = (data, filter) => {
    switch (filter) {
      case "name":
        return [...data].sort((a, b) =>
          a.attributes.name.localeCompare(b.attributes.name)
        );
      case "price":
        return [...data].sort((a, b) => a.attributes.price - b.attributes.price);
      case "rating":
        return [...data].sort((a, b) => b.attributes.rating - a.attributes.rating);
      case "time":
        return [...data].sort((a, b) => a.attributes.time - b.attributes.time);
      default:
        return data;
    }
  };

  return (
    <ul className="grid grid-cols-2 gap-10 p-4 mb-28">
      <li className="col-span-2">
        <div className="w-full h-[50px] border border-gray-300 flex items-center justify-between p-2">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setClick(!click)}
          >
            <SortOutlinedIcon className="mr-2" />
            <span className="font-semibold">Sort / Filter</span>
          </div>
        </div>

        <CSSTransition
          in={click}
          timeout={300}
          classNames="dropdown"
          unmountOnExit
        >
          <div className="w-full bg-white shadow-lg border mt-2 p-4 rounded-md transition-all duration-300">
            <ul className="space-y-2">
              <li
                className={`cursor-pointer ${filter === "name" ? "font-bold" : ""}`}
                onClick={() => setFilter("name")}
              >
                Name
              </li>
              <li
                className={`cursor-pointer ${filter === "price" ? "font-bold" : ""}`}
                onClick={() => setFilter("price")}
              >
                Price
              </li>
              <li
                className={`cursor-pointer ${filter === "rating" ? "font-bold" : ""}`}
                onClick={() => setFilter("rating")}
              >
                Rating
              </li>
              <li
                className={`cursor-pointer ${filter === "time" ? "font-bold" : ""}`}
                onClick={() => setFilter("time")}
              >
                Time
              </li>
            </ul>
          </div>
        </CSSTransition>
      </li>

      {results.map((result, key) => (
        <li key={key} className="w-full">
          <SearchResultCard
            id={result.attributes.id}
            searchText={searchText}
            name={result.attributes.name}
            cuisines={result.attributes.cuisine.data.attributes.name}
            time={result.attributes.time}
            description={result.attributes.description}
            price={result.attributes.price}
            image={result.attributes.image.data.attributes}
            rating={result.attributes.rating}
          />
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
