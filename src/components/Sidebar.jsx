import { Playlists } from "./Playlists";

export const Sidebar = () => (
	<div className="flex flex-col gap-2">
		<div className="bg-red-900 rounded-xl px-6 py-4">
			<ul>
				<li>Home</li>
				<li>Search</li>
			</ul>
		</div>

		<Playlists />
	</div>
);
