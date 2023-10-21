import { useSession } from "next-auth/react";

export const Center = () => {
	const { data: session } = useSession();
	return (
		<div className="bg-slate-500 rounded-md p-4">
			<div className="grid grid-cols-[1fr_auto]">
				<div></div>

				<img src={session?.user.image} className="h-7 rounded-full outline outline-4 outline-[#000000aa]" />
			</div>
		</div>
	);
};
