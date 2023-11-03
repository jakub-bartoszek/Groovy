import { LeftArrowIcon } from "../../assets/icons/left-arrow";
import BellIcon from "@heroicons/react/outline/BellIcon";
import DownloadIcon from "@heroicons/react/outline/DownloadIcon";
import {
	selectBgColor,
	selectOpacity
} from "../../utils/spotifyDataSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "./SearchBar";

export const AccountBar = ({ accessToken, width }) => {
	const bgColor = useSelector(selectBgColor);
	const opacity = useSelector(selectOpacity);
	const navigate = useNavigate();

	return (
		<div
			style={{
				backgroundColor: `rgba(${bgColor?.R}, ${bgColor?.G}, ${bgColor?.B}, ${opacity})`,
				transition: "background-color 0.1s linear"
			}}
			className={`grid grid-cols-[auto_1fr_auto_auto_auto] gap-3 px-5 items-center w-full absolute top-0 h-[72px] z-10 text-white`}
		>
			<button
				onClick={() => navigate(-1)}
				className="w-8 h-8 bg-[#000000aa] rounded-full flex items-center justify-center"
			>
				<LeftArrowIcon size={18} />
			</button>
			<div>
				{window.location.href.includes("search") && (
					<SearchBar accessToken={accessToken} />
				)}
			</div>
			<button
				className={`h-8 ${
					width < 700 ? "w-8" : "px-4"
				} bg-[#000000aa] text-muted rounded-full flex items-center justify-center hover:scale-105 hover:text-white`}
			>
				{width > 700 ? (
					"Download app"
				) : (
					<DownloadIcon className="h-6" />
				)}
			</button>
			<button className="h-8 w-8 bg-[#000000aa] text-muted rounded-full flex items-center justify-center hover:scale-105 hover:text-white">
				<BellIcon className="h-6" />
			</button>
			<div
				tabIndex={1}
				className="group relative cursor-pointer"
			>
				<div className="h-8 w-8 bg-[#000000aa] rounded-full flex items-center justify-center  hover:scale-105"></div>
				<ul className="absolute right-0 top-10 w-56 bg-[#282828] text-sm p-1 rounded-[10px] hidden group-focus-within:block scale-100 z-20">
					<li>
						<button className="hover:bg-[#3e3e3e] p-3 w-full text-left">
							Account
						</button>
					</li>
					<li>
						<button className="hover:bg-[#3e3e3e] p-3 w-full text-left">
							Profile
						</button>
					</li>
					<li>
						<button className="hover:bg-[#3e3e3e] p-3 w-full text-left">
							Help
						</button>
					</li>
					<li>
						<button className="hover:bg-[#3e3e3e] p-3 w-full text-left">
							Download
						</button>
					</li>
					<li>
						<button className="hover:bg-[#3e3e3e] p-3 w-full text-left">
							Settings
						</button>
					</li>
					<li>
						<button className="hover:bg-[#3e3e3e] p-3 w-full text-left border-t-[1px] border-t-[#ffffff50]">
							Logout
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
};
