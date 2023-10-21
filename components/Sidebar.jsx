import { Resizable } from "re-resizable";
import { useEffect, useRef, useState } from "react";
import { HomeIcon, SearchIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";

export const Sidebar = () => {
	const { data: session, status } = useSession();

	console.log(session);

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
	}, []);

	return (
		<Resizable
			className="h-full overflow-hidden pr-2"
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
				className="h-full grid grid-flow-row grid-rows-[auto_1fr] gap-2"
				ref={sidebarRef}
			>
				<nav className="flex flex-col rounded-md p-5 gap-4 font-bold bg-[#121212] text-[#b3b3b3]">
					<button className="flex items-center gap-4 hover:text-white">
						<HomeIcon className="w-7" />
						{width > 70 && <p>Home</p>}
					</button>
					<button className="flex items-center gap-4 hover:text-white">
						<SearchIcon className="w-7" />
						{width > 70 && <p>Search</p>}
					</button>
				</nav>
				<div className="overflow-y-scroll scrollbar-none hover:scrollbar scrollbar-w-3 scrollbar-track-transparent scrollbar-thumb-[#5a5a5a] hover:scrollbar-thumb-[#898989]">

				</div>
			</div>
		</Resizable>
	);
};
