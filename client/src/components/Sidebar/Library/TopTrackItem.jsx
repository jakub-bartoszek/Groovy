export const TopTrackItem = ({
	item,
	width,
}) => (
		<li
    key={item.id}
			className={`flex items-center gap-3 p-2 rounded-md hover:bg-[#1a1a1a] cursor-pointer ${
				width <= 70 && "justify-center"
			}`}
		>
			<div className="h-11 w-11 rounded-md bg-[#282828] flex items-center justify-center relative">
				{item.album.images[0] && (
					<img
						alt={item.name}
						className="h-11 w-11 rounded-md absolute"
						src={item.album.images[0].url}
					/>
				)}
			</div>
			{width > 70 && (
				<div>
					<p className="font-semibold text-white">{item.name}</p>
					<p className=" text-sm">Track • {item.artists[0].name}</p>
				</div>
			)}
		</li>
);
