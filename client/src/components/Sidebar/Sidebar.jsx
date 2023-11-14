import { Resizable } from "re-resizable";
import { useEffect, useRef, useState } from "react";
import { HomeIcon } from "../../assets/icons/HomeIcon";
import { SearchIcon } from "../../assets/icons/SearchIcon";
import { Library } from "./Library/Library";
import { NavLink } from "react-router-dom";

export const Sidebar = ({ accessToken }) => {
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
			maxWidth={
				(window.innerWidth >= 1000 && "420px") ||
				(window.innerWidth < 1000 && window.innerWidth >= 820 && "300px") ||
				(window.innerWidth < 820 && "70px")
			}
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
					className={`py-4 px-[19px] flex flex-col rounded-[10px] gap-4 font-bold bg-[#121212] text-[#b3b3b3] ${
						width <= 70 && "items-center"
					}`}
				>
					<NavLink to="/home">
						<button className="flex gap-4 items-center">
							<div className="h-8 w-8 flex items-center justify-center">
								<HomeIcon size={22} />
							</div>
							{width > 70 && <span>Home</span>}
						</button>
					</NavLink>
					<NavLink to="/search">
						<button className="flex gap-4 items-center">
							<div className="h-8 w-8 flex items-center justify-center">
								<SearchIcon size={22} />
							</div>
							{width > 70 && <span>Search</span>}
						</button>
					</NavLink>
				</nav>
				<Library
					accessToken={accessToken}
					width={width}
				/>
			</div>
		</Resizable>
	);
};
