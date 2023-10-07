import React from "react";
import useAuth from "../utils/useAuth";
import { Sidebar } from "../components/Sidebar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Search } from "../components/Search";
import { selectToken } from "../utils/spotifyDataSlice";
import { useSelector } from "react-redux";

const Dashboard = ({ token }) => {
	return (
		<BrowserRouter>
			<div className="grid grid-cols-[auto_2fr] gap-2 bg-[#000000] h-[100vh] p-2 ">
				<Sidebar />
				<div className="bg-gradient-to-b from-gray-600 to-black rounded-xl p-2">
					<Routes>
						<Route
							path="/search"
							element={<Search token={token} />}
						/>
						<Route
							path="/home"
							element={<div>Home</div>}
						/>
						<Route
							path="/"
							element={<Navigate to="/home" />}
						/>
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
};

export default Dashboard;
