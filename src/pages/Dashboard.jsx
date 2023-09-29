import React from "react";
import { Playlists } from "../components/Playlists";
import { Recommendations } from "../components/Recommendations";
import { Sidebar } from "../components/Sidebar";

const DashBoard = () => (
	<div className=" bg-black w-100 h-[100vh] grid grid-flow-col p-2 gap-2">
		<Sidebar />
		<Recommendations />
	</div>
);

export default DashBoard;
