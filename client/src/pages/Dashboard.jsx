import { Sidebar } from "../components/Sidebar/Sidebar";
import {
	BrowserRouter,
	Navigate,
	Route,
	Routes
} from "react-router-dom";
import { Search } from "../components/Search/Search";
import { Player } from "../components/Player";
import { Home } from "../components/Home/Home";
import { Playlist } from "../components/Playlist/Playlist";
import { Artist } from "../components/Artist/Artist";
import { AccountBar } from "../components/AccountBar/AccountBar";
import { useEffect, useRef, useState } from "react";
import useAuth from "../utils/useAuth";
import { LikedSongs } from "../components/LikedSongs";


const Dashboard = ({ code }) => {
	const [width, setWidth] = useState();
	const contentWrapperRef = useRef()
	const accessToken = useAuth(code);


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
			<div className="grid grid-cols-[auto_2fr]  grid-rows-[1fr_80px] gap-2 bg-[black] h-screen max-h-screen p-2">
				<Sidebar accessToken={accessToken} />
				<div ref={contentWrapperRef} className="flex flex-col h-[100%] overflow-hidden rounded-xl relative">
					<AccountBar width={width} accessToken={accessToken} />
					<Routes>
						<Route
							path="/artists/:id"
							element={<Artist width={width} accessToken={accessToken} />}
						/>
						<Route
							path="/playlists/:id"
							element={<Playlist width={width} accessToken={accessToken} />}
						/>
						<Route
							path="/liked"
							element={<LikedSongs width={width} accessToken={accessToken} />}
						/>
						<Route
							path="/search"
							element={<Search width={width} accessToken={accessToken} />}
						/>
						<Route
							path="/home"
							element={<Home width={width} accessToken={accessToken} />}
						/>
						<Route
							path="/"
							element={<Navigate to="/home" />}
						/>
					</Routes>
				</div>
				<Player accessToken={accessToken} />
			</div>
		</BrowserRouter>
	);
};

export default Dashboard;
