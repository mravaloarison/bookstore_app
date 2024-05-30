import { Button } from "../ui/button";
import { useState } from "react";

export default function Header() {
	const [isUserSignedIn, setIsUserSignedIn] = useState(false);

	function signUserInWithGoogle() {
		setIsUserSignedIn(true);
	}

	return (
		<header className="p-4 flex w-full justify-between items-center border-b">
			<h1 className="text-xl font-extrabold font-mono text-slate-500">
				<span className="text-yellow-600">Book</span>Store
			</h1>
			<div className="flex gap-8 items-center">
				{isUserSignedIn ? (
					<Button onClick={() => setIsUserSignedIn(false)}>
						Sign Out
					</Button>
				) : (
					<Button variant="secondary" onClick={signUserInWithGoogle}>
						Sign in with Google
					</Button>
				)}
			</div>
		</header>
	);
}
