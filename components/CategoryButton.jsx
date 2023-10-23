export const CategoryButton = ({
	libraryCategory,
	setLibraryCategory,
	name
}) => (
	<button
		onClick={() => setLibraryCategory(name)}
		className={`text-sm py-1.5 px-3 rounded-full ${
			libraryCategory === name
				? "bg-white text-black"
				: "bg-[#232323] text-white"
		}`}
	>
		{name}
	</button>
);
