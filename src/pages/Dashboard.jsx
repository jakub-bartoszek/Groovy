import { Sidebar } from "../components/Sidebar";
import {
	BrowserRouter,
	Navigate,
	Route,
	Routes
} from "react-router-dom";
import { Search } from "../components/Search";
import { Player } from "../components/Player";
import { Home } from "../components/Home";
import { LikedSongs } from "../components/LikedSongs";

const Dashboard = ({ token }) => {
	return (
		<BrowserRouter>
			<div className="grid grid-cols-[auto_2fr] grid-rows-[1fr_80px] gap-2 bg-black h-screen max-h-screen p-2">
				<Sidebar />

				<div className="flex flex-col h-[100%] overflow-y-scroll pl-5 pr-2 rounded-xl bg-gradient-to-b from-gray-600 ">
					<Routes>
					<Route
							path="/liked"
							element={<LikedSongs token={token} />}
						/>
						<Route
							path="/search"
							element={<Search token={token} />}
						/>
						<Route
							path="/home"
							element={<Home token={token} />}
						/>
						<Route
							path="/"
							element={<Navigate to="/home" />}
						/>
					</Routes>
				</div>
				<Player token={token} />
			</div>
		</BrowserRouter>
	);
};

export default Dashboard;
