export const CategoryButton = ({
	category,
	setCategory,
	name
}) => (
	<button
		onClick={() => setCategory(name.toLowerCase())}
		className={`text-sm px-3 rounded-full h-8 ${
			category === name.toLowerCase()
				? "bg-white text-black"
				: "bg-[#232323] text-white"
		}`}
	>
		{name}
	</button>
);
