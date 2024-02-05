export const CategoryButton = ({ category, setCategory, name }) => (
 <button
  className={`text-sm px-3 rounded-full h-8
		${
   category === name.toLowerCase()
    ? "bg-white text-black"
    : "bg-[#232323] text-white"
  }`}
  onClick={() => setCategory(name.toLowerCase())}
 >
  {name}
 </button>
);
