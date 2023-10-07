import { NavLink } from "react-router-dom";
import { Library } from "./Library";
import { SearchIcon } from "../assets/search.jsx";
import { HomeIcon } from "../assets/home";

export const Sidebar = () => (
	<div className="flex flex-col gap-2 float-left text-white w-[350px]">
		<nav className="bg-[#121212] text-[#b3b3b3] rounded-xl px-6 py-4 flex flex-col gap-3">
			<NavLink to="/home">
				<div className="flex items-center gap-4 font-bold ">
					<HomeIcon />
					Home
				</div>
			</NavLink>
			<NavLink to="/search">
				<div className="flex items-center gap-4 font-bold ">
					<SearchIcon
						height={20}
						width={20}
					/>
					Search
				</div>
			</NavLink>
		</nav>
		<Library />
	</div>
);
