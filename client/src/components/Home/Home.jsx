import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBgColor, setOpacity } from "../../utils/redux/colorsSlice";
import { Tile } from "./Tile";
import { Loader } from "../../assets/Loader";
import { NavLink } from "react-router-dom";
import {
	selectRecentlyPlayed,
	selectStatus
} from "../../utils/redux/homeSlice";

export const Home = ({ accessToken, width }) => {
	const dispatch = useDispatch();
	const recentlyPlayed = useSelector(selectRecentlyPlayed);
	const bgColor = useSelector(selectBgColor);
	const scrollRef = useRef();
	const _ = require("lodash");
	const status = useSelector(selectStatus);

	const throttledScroll = useCallback(
		_.throttle(
			() => {
				dispatch(setOpacity(scrollRef.current.scrollTop / 300));
			},
			100,
			{ leading: false }
		),
		[setOpacity]
	);

	return (
		<div className="h-full overflow-hidden relative bg-[#121212] rounded-[10px] text-white">
			<div
				className="text-white h-full overflow-y-scroll"
				ref={scrollRef}
				onScroll={throttledScroll}
			>
				<div
					className="pt-[72px] p-4 bg-red-500"
					style={{
						backgroundImage: `linear-gradient(rgba(18, 18, 18, 0.7), #121212)`,
						backgroundColor: `rgba(${bgColor?.R}, ${bgColor?.G}, ${bgColor?.B}, 1)`,
						transition: "0.3s linear"
					}}
				>
					<h1 className=" text-3xl font-bold py-6">Hello!</h1>
					{
						{
							loading: (
								<div className="flex items-center justify-center">
									<Loader />
								</div>
							),
							error: <>Error</>,
							success: (
								<ul
									className={`grid gap-4 font-semibold ${
										width > 900 && "grid-cols-3"
									} ${width > 550 && width < 900 && "grid-cols-2"} ${
										width < 550 && "grid-cols-1"
									}`}
								>
									<NavLink to="/liked">
										<Tile
											width={width}
											name="Liked songs"
											imgSrc="https://misc.scdn.co/liked-songs/liked-songs-300.png"
										/>
									</NavLink>
									{recentlyPlayed.map((track) => (
										<Tile
											width={width}
											track={track}
										/>
									))}
								</ul>
							)
						}[status]
					}
				</div>
			</div>
		</div>
	);
};
