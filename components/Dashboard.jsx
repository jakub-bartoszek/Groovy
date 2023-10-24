import { AccountBar } from "./AccountBar";

export const Center = () => {
	return (
		<div className="h-full overflow-hidden relative">
			<AccountBar />
			<div className="bg-[#121212] p-5 pt-20 h-full overflow-y-scroll scrollbar-none hover:scrollbar scrollbar-w-3 scrollbar-track-transparent scrollbar-thumb-[#5a5a5a] hover:scrollbar-thumb-[#898989]">
				{/* content */}
			</div>
		</div>
	);
};
