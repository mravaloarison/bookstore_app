"use client";

import { Loader, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { signInWithGoogle } from "@/app/functions/authentication";
import SignedInIcon from "./signed_in_icon";

export default function Header() {
	const [isUserSignedIn, setIsUserSignedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	function signUserInWithGoogle() {
		setIsLoading(true);

		signInWithGoogle();

		if (sessionStorage.getItem("user")) {
			setIsUserSignedIn(true);
			setIsLoading(false);

			// window.location.reload();
		}
	}

	return (
		<header className="p-4 flex w-full justify-between items-center border-b">
			<h1 className="text-xl font-extrabold font-mono text-slate-500">
				<span className="text-yellow-600">Book</span>Bridge
			</h1>

			<div className="flex gap-8 items-center">
				<div className="hidden">
					<a href="/">Books</a>
					<a href="/community">Community</a>
					<a
						href="/ai_search"
						className="text-blue-600 flex justify-center items-center gap-2"
					>
						<Sparkles size={16} />
						Ask AI
					</a>
				</div>
				{isUserSignedIn ? (
					<div>
						<SignedInIcon />
					</div>
				) : (
					<Button variant="secondary" onClick={signUserInWithGoogle}>
						{isLoading ? (
							<Loader className="w-6 h-6" />
						) : (
							"Sign in with Google"
						)}
					</Button>
				)}
			</div>
		</header>
	);
}
