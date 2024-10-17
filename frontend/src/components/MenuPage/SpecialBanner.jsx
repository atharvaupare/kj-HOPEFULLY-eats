import { useState, useEffect } from "react";

const baseUrl = "http://localhost:1337/api/menu-items?populate=*";

const fetchMenuItems = async () => {
  try {
    const response = await fetch(baseUrl);
    const data = await response.json();

    // Find the item with the name "Pav Bhaji"
    const pavBhaji = data.data.find(
      (item) => item.attributes.name === "Pav Bhaji"
    );

    if (pavBhaji) {
      return pavBhaji.attributes.image.data.attributes.url;
    } else {
      console.log("Pav Bhaji not found.");
    }
  } catch (error) {
    console.error("Error fetching menu items:", error);
  }
};

const SpecialBanner = () => {
  const [img, setImg] = useState(null);

  useEffect(() => {
    // Fetch the image when the component mounts
    const getPavBhajiImage = async () => {
      const image = await fetchMenuItems();
      if (image) {
        setImg(image);
      }
    };
    getPavBhajiImage();
  }, []);

  return (
    <div className="w-[90vw] h-[140px] rounded-3xl bg-gradient-to-r from-[#9577f2] to-[#a085f7] mt-5 flex items-center justify-between">
      <div className="text-white ml-4">
        <h2 className="text-lg">Today's Offer</h2>
        <p className="text-xl font-semibold">Special Pav Bhaji</p>
        <p>Rs. 150</p>
      </div>
      {img ? (
        <img
          src={`http://localhost:1337${img}`}
          alt="Pav Bhaji"
          className="mr-4 h-[100px] w-[100px] object-cover rounded-xl"
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SpecialBanner;
