import { Resizable } from "re-resizable";
import { useEffect, useRef, useState } from "react";
import { HomeIcon } from "../assets/icons/home";
import { SearchIcon } from "../assets/icons/search";
import { Library } from "./Library";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
	const [width, setWidth] = useState();
	const sidebarRef = useRef();
	let snap = [];

	function returnMe() {
		for (var i = 285; i < 421; i++) {
			snap.push(i);
			if (i === 420) return snap;
		}
	}
	returnMe();

	useEffect(() => {
		const element = sidebarRef.current;
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
		<Resizable
			className="h-full overflow-hidden"
			snapGap={150}
			minWidth="70px"
			snap={{
				x: [70].concat(snap)
			}}
			maxWidth="420px"
			defaultSize={{
				width: "300px",
				height: "100%"
			}}
		>
			<div
				className="h-full grid grid-flow-row grid-rows-[auto_1fr] gap-2 overflow-hidden"
				ref={sidebarRef}
			>
				<nav
					className={`py-4 px-[19px] flex flex-col rounded-md gap-4 font-bold bg-[#121212] text-[#b3b3b3] ${
						width <= 70 && "items-center"
					}`}
				>
					<NavLink to="/home">
						<button className="flex gap-4 items-center">
							<div className="h-8 w-8 flex items-center justify-center">
								<HomeIcon size={22} />
							</div>
							{width > 70 && <p>Home</p>}
						</button>
					</NavLink>
					<NavLink to="/search">
						<button className="flex gap-4 items-center">
							<div className="h-8 w-8 flex items-center justify-center">
								<SearchIcon size={22} />
							</div>
							{width > 70 && <p>Search</p>}
						</button>
					</NavLink>
				</nav>
				<Library width={width} />
			</div>
		</Resizable>
	);
};
