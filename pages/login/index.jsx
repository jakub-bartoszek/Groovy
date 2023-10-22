import { getProviders, signIn } from "next-auth/react";

function Login({ providers }) {
	return (
		<div className="bg-black h-screen overflow-hidden flex items-center justify-center">
			{Object.values(providers).map((provider) => (
				<div
					className="flex flex-col gap-12 items-center"
					key={provider.name}
				>
					<img className="w-24 h-24" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/240px-Spotify_logo_without_text.svg.png" />
					<button
						className="bg-[#18d860] hover:bg-white p-4 rounded-full font-bold"
						onClick={() => signIn(provider.id, { callbackUrl: "/" })}
					>
						Login with {provider.name}
					</button>
				</div>
			))}
		</div>
	);
}

export default Login;

export async function getServerSideProps() {
	const providers = await getProviders();

	return {
		props: {
			providers
		}
	};
}
