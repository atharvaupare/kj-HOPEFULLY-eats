/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import SearchResultCard from "./SearchResultCard";
import useDebounce from "../../hooks/useDebounce";

const SearchResults = ({ searchText }) => {
  const [results, setResults] = useState([]);
  const debouncedText = useDebounce(searchText, 300);

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/menu-items?populate=*"
        );
        const data = await response.json();

        const regex = new RegExp(`\\b${debouncedText}`, "i");
        const matchedResults = data.data.filter(({ attributes }) =>
          attributes.name.match(regex)
        );

        setResults(matchedResults);
      } catch (e) {
        console.log(e);
      }
    };

    if (debouncedText) {
      getItems();
    } else {
      setResults([]);
    }
  }, [debouncedText]);

  return (
    <ul className="grid grid-cols-2 gap-10 p-4 mb-28">
      {results.map((result, key) => (
        <li key={key} className="w-full">
          <SearchResultCard
            id={result.attributes.id}
            searchText={searchText}
            name={result.attributes.name}
            cuisines={result.attributes.cuisine.data.attributes.name}
            time={25}
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