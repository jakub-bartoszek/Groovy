import { useDispatch, useSelector } from "react-redux";
import { SearchIcon } from "../../assets/icons/search";
import {
	selectSearchQuery,
	setSearchQuery
} from "../../utils/searchSlice";

export const SearchBar = ({accessToken}) => {
	const dispatch = useDispatch();
	const searchQuery = useSelector(selectSearchQuery);

	return (
		<label className="pl-2 pr-4 h-12 flex items-center bg-[#242424] text-white rounded-full hover:bg-[#2a2a2a] focus-within:outline focus-within:outline-2">
			<SearchIcon size={20} />
			<input
				className="pl-2 h-8 bg-transparent focus:outline-none placeholder-[#888888] w-full"
				placeholder="What are you looking for?"
				value={searchQuery}
				onChange={(event) => {
					dispatch(setSearchQuery(event.target.value));
				}}
			/>
		</label>
	);
};
