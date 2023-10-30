import { LeftArrowIcon } from "../assets/icons/left-arrow";
import BellIcon from "@heroicons/react/outline/BellIcon";
import { selectBgColor, selectOpacity } from "../utils/spotifyDataSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const AccountBar = ({searchInput}) => {
	const bgColor = useSelector(selectBgColor)
	const opacity = useSelector(selectOpacity)
	const navigate = useNavigate();

	return (
		<div
			style={{
				backgroundColor: `rgba(${bgColor?.R}, ${bgColor?.G}, ${bgColor?.B}, ${opacity})`,
				transition: "background-color 0.1s linear"
			}}
			className={`flex justify-between gap-3 items-center p-5 w-full absolute top-0 h-[72px] z-10 text-white`}
		>
			<button onClick={() => navigate(-1)} className="h-8 w-8 bg-[#000000aa] rounded-full flex items-center justify-center">
				<LeftArrowIcon size={18} />
			</button>
			{searchInput}
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
