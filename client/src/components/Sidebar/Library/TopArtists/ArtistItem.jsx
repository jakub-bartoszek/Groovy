import { NavLink } from "react-router-dom";

export const ArtistItem = ({ item, width, path }) => (
	<li key={item.id}>
		<NavLink to={path}>
			<div
				className={`flex items-center gap-3 p-2 rounded-md hover:bg-[#1a1a1a] cursor-pointer playlist ${
					width <= 70 && "justify-center"
				}`}
			>
				<div className="h-11 w-11 rounded-full bg-[#282828] flex items-center justify-center relative">
					{item.images[0] && (
						<img
							alt={item.name}
							className="h-11 w-11 rounded-full absolute"
							src={item?.images[item.images.length - 1]?.url}
						/>
					)}
				</div>
				{width > 70 && (
					<div>
						<p className="font-semibold text-white">{item.name}</p>
						<p className=" text-sm">Artist</p>
					</div>
				)}
			</div>
		</NavLink>
	</li>
);
