"use client";

import { Loader, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { signInWithGoogle } from "@/app/functions/authentication";
import SignedInIcon from "./signed_in_icon";

export default function Header() {
	const [isLoading, setIsLoading] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		if (sessionStorage.getItem("user")) {
			setIsLoggedIn(true);
		}
	});

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
			<div
				onClick={() => (window.location.href = "/")}
				className="text-2xl font-extrabold text-orange-500 hover:cursor-pointer flex items-baseline gap-2"
			>
				<img
					src="/logo1.png"
					alt="BookBridge Logo"
					className="w-15 h-8"
				/>
				<p>
					<span className="text-slate-900">Book</span>Bridge
				</p>
			</div>

			<div className="flex gap-8 items-center">
				{isLoggedIn ? (
					<div>
						<div className="flex bg-muted/40">
							<SignedInIcon />
						</div>
					</div>
				) : (
					<Button variant="outline" onClick={signUserInWithGoogle}>
						{isLoading ? (
							<Loader className="w-6 h-6 animate-spin" />
						) : (
							<div className="flex gap-2 items-center">
								<img
									src="https://banner2.cleanpng.com/20180324/sbe/kisspng-google-logo-g-suite-google-5ab6f1f0dbc9b7.1299911115219389289003.jpg"
									alt="Google Logo"
									className="w-4 h-4"
								/>
								<p>Sign in with Google</p>
							</div>
						)}
					</Button>
				)}
			</div>
		</header>
	);
}
