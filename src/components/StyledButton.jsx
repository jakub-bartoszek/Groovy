import { useDispatch } from "react-redux";
import { setLibraryCategory } from "../utils/spotifyDataSlice";

export const StyledButton = ({ name }) => {
	const dispatch = useDispatch();
	return (
		<button
			onClick={() => dispatch(setLibraryCategory(name))}
			className="bg-[#242424] py-1 px-3 rounded-full cursor-pointer hover:brightness-125 transition-all"
		>
			{name}
		</button>
	);
};
