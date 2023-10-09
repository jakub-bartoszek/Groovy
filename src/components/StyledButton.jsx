import { useDispatch, useSelector } from "react-redux";
import {
	selectLibraryCategory,
	setLibraryCategory
} from "../utils/spotifyDataSlice";

export const StyledButton = ({ name }) => {
	const libraryCategory = useSelector(selectLibraryCategory);
	const dispatch = useDispatch();
	return (
		<button
			onClick={() => dispatch(setLibraryCategory(name))}
			className={`bg-[#242424] ${libraryCategory === name ? "bg-white" : ""} py-1 px-4 rounded-full cursor-pointer hover:brightness-125 transition-all`}
		>
			{name}
		</button>
	);
};
