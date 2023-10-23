import { Resizable } from "re-resizable";
import { useEffect, useRef, useState } from "react";
import { HomeIcon } from "../assets/icons/home";
import { SearchIcon } from "../assets/icons/search";
import { Library } from "./Library";

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
	}, [sidebarRef.current]);

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
				width: "300px"
			}}
		>
			<div
				className="h-full grid grid-flow-row grid-rows-[auto_1fr] gap-2 overflow-hidden"
				ref={sidebarRef}
			>
				<nav className="flex flex-col rounded-md p-5 gap-6 font-bold bg-[#121212] text-[#b3b3b3]">
					<button
						className={`flex items-center gap-6 hover:text-white${
							width <= 70 && "justify-center"
						}`}
					>
						<HomeIcon size={28} />
						{width > 70 && <p>Home</p>}
					</button>
					<button
						className={`flex items-center gap-6 hover:text-white${
							width <= 70 && "justify-center"
						}`}
					>
						<SearchIcon size={28} />
						{width > 70 && <p>Search</p>}
					</button>
				</nav>
				<Library width={width} />
			</div>
		</Resizable>
	);
};
