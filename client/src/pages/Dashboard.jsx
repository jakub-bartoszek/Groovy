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
import { LikedTracks } from "../components/LikedTracks";
import { Playlist } from "../components/Playlist";
import { Artist } from "../components/Artist";
import { AccountBar } from "../components/AccountBar";
import { useEffect, useRef, useState } from "react";

const Dashboard = ({ token }) => {
	const [width, setWidth] = useState();
	const contentWrapperRef = useRef()

	useEffect(() => {
		const element = contentWrapperRef.current;
		if (element) {
			const observer = new ResizeObserver(() => {
				setWidth(element.offsetWidth);
			});
			observer.observe(element);
			return () => {
				observer.disconnect();
			};
		}
	}, [width]);

	return (
		<BrowserRouter>
			<div className="grid grid-cols-[auto_2fr] grid-rows-[1fr_80px] gap-2 bg-black h-screen max-h-screen p-2">
				<Sidebar />
				<div ref={contentWrapperRef} className="flex flex-col h-[100%] overflow-hidden rounded-xl relative">
					<AccountBar />
					<Routes>
						<Route
							path="/artists/:id"
							element={<Artist token={token} />}
						/>
						<Route
							path="/playlists/:id"
							element={<Playlist width={width} token={token} />}
						/>
						<Route
							path="/liked"
							element={<LikedTracks width={width} token={token} />}
						/>
						<Route
							path="/search"
							element={<Search token={token} />}
						/>
						<Route
							path="/home"
							element={<Home width={width} token={token} />}
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
