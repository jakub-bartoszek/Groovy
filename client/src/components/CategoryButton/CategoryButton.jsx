const CategoryButton = ({ category, setCategory, name }) => (
 <button
  className={`text-sm px-3 rounded-full h-8 bg-[#232323]
  ${category === name.toLowerCase() && "bg-white text-black"}`}
  onClick={() => setCategory(name.toLowerCase())}
 >
  {name}
 </button>
);

export default CategoryButton;
