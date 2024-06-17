"use client";

import { Loader } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { signInWithGoogle } from "@/app/functions/authentication";
import SignedInIcon from "./signed_in_icon";

export default function Header() {
	const [isLoading, setIsLoading] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	function signUserInWithGoogle() {
		setIsLoading(true);

		signInWithGoogle(() => {
			setIsLoggedIn(true);
		});

		if (sessionStorage.getItem("user")) {
			setIsLoading(false);
		}
	}

	return (
		<header className="p-4 flex w-full justify-between items-center border-b">
			<h1 className="text-xl font-extrabold font-mono text-slate-500">
				<span className="text-yellow-600">Book</span>Bridge
			</h1>

			<div className="flex gap-8 items-center">
				{isLoggedIn ? (
					<div className="flex bg-muted/40">
						<SignedInIcon />
					</div>
				) : (
					<Button variant="secondary" onClick={signUserInWithGoogle}>
						{isLoading ? (
							<Loader className="w-6 h-6 animate-spin" />
						) : (
							"Sign in with Google"
						)}
					</Button>
				)}
			</div>
		</header>
	);
}
