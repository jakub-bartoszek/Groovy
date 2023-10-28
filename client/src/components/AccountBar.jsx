import { useEffect, useState } from "react";
import { LeftArrowIcon } from "../assets/icons/left-arrow";
import BellIcon from "@heroicons/react/outline/BellIcon";
import axios from "axios";
import { selectToken } from "../utils/spotifyDataSlice";
import { useSelector } from "react-redux";

export const AccountBar = ({ bgColor, opacity }) => {
	const token = useSelector(selectToken);
	const [user, setUser] = useState({});

	useEffect(() => {
		const getCurrentUser = async () => {
			const response = await axios.get(
				`https://api.spotify.com/v1/me`,
				{
					headers: {
						Authorization: "Bearer " + token,
						"Content-Type": "application/json"
					}
				}
			);
			setUser({
				image:
					response.data.images[response.data.images.length - 1].url,
				name: response.data.display_name
			});
		};
		getCurrentUser();
	});

	return (
		<div
			style={{
				backgroundColor: `rgba(${bgColor?.R}, ${bgColor?.G}, ${bgColor?.B}, ${opacity})`,
				transition: "background-color 0.1s linear"
			}}
			className={`flex justify-between gap-3 items-center w-full absolute p-5 top-0`}
		>
			<button className="h-8 w-8 bg-[#000000aa] rounded-full flex items-center justify-center">
				<LeftArrowIcon size={18} />
			</button>
			<div className="flex gap-3">
				<button className="h-8 bg-[#000000aa] rounded-full flex items-center px-4 hover:scale-105 text-sm">
					Zainstaluj aplikację
				</button>
				<button className="h-8 w-8 bg-[#000000aa] text-muted rounded-full flex items-center justify-center hover:scale-105 hover:text-white ">
					<BellIcon className="h-6" />
				</button>
				<div
					tabIndex={1}
					className="self-end group relative cursor-pointer"
				>
					<div className="h-8 w-8 bg-[#000000aa] rounded-full flex items-center justify-center  hover:scale-105">
						<img
						className="w-6 rounded-full"
							src={user.image}
							alt={user.name}
						/>
					</div>
					<ul className="absolute right-0 top-10 w-56 bg-[#282828] text-sm p-1 rounded-md hidden group-focus-within:block scale-100 z-20">
						<li>
							<button className="hover:bg-[#3e3e3e] p-3 w-full text-left">
								Konto
							</button>
						</li>
						<li>
							<button className="hover:bg-[#3e3e3e] p-3 w-full text-left">
								Profil
							</button>
						</li>
						<li>
							<button className="hover:bg-[#3e3e3e] p-3 w-full text-left">
								Pomoc
							</button>
						</li>
						<li>
							<button className="hover:bg-[#3e3e3e] p-3 w-full text-left">
								Pobierz
							</button>
						</li>
						<li>
							<button className="hover:bg-[#3e3e3e] p-3 w-full text-left">
								Ustawienia
							</button>
						</li>
						<li>
							<button className="hover:bg-[#3e3e3e] p-3 w-full text-left border-t-[1px] border-t-[#ffffff50]">
								Wyloguj
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
