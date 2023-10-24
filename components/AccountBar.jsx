import { signOut, useSession } from "next-auth/react";
import { LeftArrowIcon } from "../assets/icons/left-arrow";
import BellIcon from "@heroicons/react/outline/BellIcon";

export const AccountBar = () => {
	const { data: session } = useSession();
	return (
		<div className="flex justify-between gap-3 items-center w-full absolute p-5 top-0">
			<div className="h-8 w-8 bg-[#000000aa] rounded-full flex items-center justify-center">
				<LeftArrowIcon size={18} />
			</div>
			<div className="flex gap-3">
				<div className="h-8 bg-[#000000aa] rounded-full flex items-center px-4 hover:scale-105 text-sm">
					Zainstaluj aplikację
				</div>
				<div className="h-8 w-8 bg-[#000000aa] text-muted rounded-full flex items-center justify-center hover:scale-105 hover:text-white ">
					<BellIcon className="h-6" />
				</div>
				<div
					tabIndex={1}
					className="h-8 w-8 bg-[#000000aa] rounded-full flex items-center justify-center self-end group relative hover:scale-105"
				>
					<img
						src={session?.user.image}
						className="h-6 rounded-full"
					/>
					<ul className="absolute right-0 top-10 w-56 bg-[#282828] text-sm p-1 rounded-md hidden group-focus-within:block">
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
							<button
								onClick={() => signOut()}
								className="hover:bg-[#3e3e3e] p-3 w-full text-left border-t-[1px] border-t-[#ffffff50]"
							>
								Wyloguj
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
