import {Playlists} from "../utils/Playlists"

export const Sidebar = () => (
	<div className=" bg-pink-400 flex flex-col gap-2">
		<div className="bg-red-900 rounded-xl px-6 py-4">
			<ul>
				<li>Home</li>
				<li>Search</li>
			</ul>
		</div>
		<div className=" bg-blue-600 rounded-xl px-6 py-4">
			<Playlists></Playlists>
		</div>
	</div>
);
