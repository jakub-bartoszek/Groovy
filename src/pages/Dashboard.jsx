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

const Dashboard = ({ token }) => {
	return (
		<BrowserRouter>
			<div className="grid grid-cols-[auto_2fr] grid-rows-[1fr_80px] gap-2 bg-[#000000] h-screen max-h-screen p-2">
				<Sidebar />

				<div className="flex flex-col h-[100%] overflow-y-scroll p-2 rounded-xl">
					<Routes>
						<Route
							path="/search"
							element={<Search token={token} />}
						/>
						<Route
							path="/home"
							element={<Home />}
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
