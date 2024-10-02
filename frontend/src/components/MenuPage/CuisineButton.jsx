/* eslint-disable react/prop-types */

const CuisineButton = ({ selected, image }) => {
  const baseUrl = "http://localhost:1337"; // Replace with your Strapi base URL

  // Ensure that 'image' contains the correct data before accessing the URL
  const imageUrl = image ? `${baseUrl}${image.url}` : "";

  return (
    <div
      className={`h-[95px] w-[100px] rounded-lg mt-5 ${
        !selected ? "bg-[#EFEEEE]" : "bg-[#462B9C]"
      } flex justify-center items-center transition-all`}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="Cuisine" className="rounded-full" />
      ) : (
        <div className="h-[85px] w-[85px] bg-gray-300 rounded-full"></div> // Placeholder if image is missing
      )}
    </div>
  );
};

export default CuisineButton;
