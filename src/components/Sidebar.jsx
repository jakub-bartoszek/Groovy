import { Link } from "react-router-dom";
import { Playlists } from "./Playlists";

export const Sidebar = ({ token, children }) => (
	<div className="flex flex-col gap-2 float-left text-white">
		<nav className="bg-[#121212] text-white rounded-xl px-6 py-4 flex flex-col">
			<Link to="/search">Search</Link>
			<Link to="/home">Home</Link>
		</nav>
		<Playlists />
	</div>
);
