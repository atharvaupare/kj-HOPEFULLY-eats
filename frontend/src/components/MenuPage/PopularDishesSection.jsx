/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback, useRef } from "react";
import HomeScreenDishCard from "./HomeScreenDishCard";

const ITEMS_PER_PAGE = 8;

const PopularDishesSection = ({ selectedCuisine }) => {
  const [allDishes, setAllDishes] = useState([]);
  const [displayedDishes, setDisplayedDishes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const observer = useRef();
  const loadingRef = useRef(false);

  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:1337/api/menu-items?populate=*"
        );
        const data = await response.json();
        
        if (data && data.data) {
          setAllDishes(data.data);
          // Initialize with first batch of dishes
          setDisplayedDishes(data.data.slice(0, ITEMS_PER_PAGE));
        }
      } catch (err) {
        setError("Failed to fetch dishes. Please try again later.");
        console.error("Error fetching dishes:", err);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  // Filter dishes based on cuisine
  const filteredAllDishes = selectedCuisine === "All"
    ? allDishes
    : allDishes.filter(
        dish => dish.attributes.cuisine.data.attributes.name === selectedCuisine
      );

  // Load more items function
  const loadMoreItems = useCallback(() => {
    if (loadingRef.current) return;
    
    loadingRef.current = true;
    setLoading(true);

    setTimeout(() => {
      const nextIndex = currentIndex + ITEMS_PER_PAGE;
      const newDishes = filteredAllDishes.slice(0, nextIndex);
      
      setDisplayedDishes(newDishes);
      setCurrentIndex(nextIndex);
      setLoading(false);
      loadingRef.current = false;
    }, 300); // Small delay for smooth loading experience
  }, [currentIndex, filteredAllDishes]);

  // Intersection Observer callback
  const lastDishElementRef = useCallback(
    (node) => {
      if (loading) return;
      
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(entries => {
        if (
          entries[0].isIntersecting && 
          displayedDishes.length < filteredAllDishes.length
        ) {
          loadMoreItems();
        }
      }, {
        threshold: 0.9,
        rootMargin: '20px'
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, displayedDishes.length, filteredAllDishes.length, loadMoreItems]
  );

  // Reset displayed dishes when cuisine changes
  useEffect(() => {
    setCurrentIndex(ITEMS_PER_PAGE);
    setDisplayedDishes(filteredAllDishes.slice(0, ITEMS_PER_PAGE));
  }, [selectedCuisine]);

  // Cleanup observer
  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-red-500 bg-red-50 px-4 py-3 rounded-md">
          {error}
        </div>
      </div>
    );
  }

  const filteredDisplayedDishes = selectedCuisine === "All"
    ? displayedDishes
    : displayedDishes.filter(
        dish => dish.attributes.cuisine.data.attributes.name === selectedCuisine
      );

  return (
    <div className="w-full">
      {filteredDisplayedDishes.length === 0 && !loading ? (
        <div className="w-full text-center py-8 text-gray-500">
          No dishes found for {selectedCuisine} cuisine
        </div>
      ) : (
        <div className="grid grid-cols-2 my-5 gap-5">
          {filteredDisplayedDishes.map((dish, index) => (
            <div
              ref={
                index === filteredDisplayedDishes.length - 1 
                  ? lastDishElementRef 
                  : null
              }
              key={dish.id}
              className="transform transition-transform duration-200 hover:scale-102"
            >
              <HomeScreenDishCard
                name={dish.attributes.name}
                price={dish.attributes.price}
                image={dish.attributes.image.data.attributes}
                description={dish.attributes.description}
                rating={dish.attributes.rating}
                dish={dish}
              />
            </div>
          ))}
        </div>
      )}
      
      {loading && (
        <div className="w-full flex justify-center py-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" 
                 style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" 
                 style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      )}
      
      {!loading && 
       filteredDisplayedDishes.length >= filteredAllDishes.length && 
       filteredDisplayedDishes.length > 0 && (
        <div className="w-full text-center py-4 text-gray-500">
          {"You've reached the end"}
        </div>
      )}
    </div>
  );
};

export default PopularDishesSection;