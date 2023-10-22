import { signOut, useSession } from "next-auth/react";

export const Center = () => {
	const { data: session } = useSession();
	return (
		<div className="bg-slate-500 rounded-md p-5">
			<div className="grid grid-cols-[1fr_auto]">
				<div></div>

				<div tabIndex="1" className="relative group">
					<img
						src={session?.user.image}
						className="h-6 rounded-full outline outline-4 outline-[#000000aa] hover:scale-105"
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
