"use client";

import { useState, useEffect } from "react";
import PleaseUpgrade from "@/components/homemade/please_upgrade";
import { isProMember } from "../functions/authentication";
import { Loader } from "lucide-react";
import MustSignIn from "@/components/homemade/must_sign_in";

export default function FavoritesPage() {
	const [username, setUsername] = useState("");
	const [isPro, setIsPro] = useState(null);

	useEffect(() => {
		const username = sessionStorage.getItem("user");
		if (username) {
			setUsername(username);
			isProMember(username)
				.then((isProMemberResult: any) => setIsPro(isProMemberResult))
				.catch((error) => console.error(error));
		}
	});

	return (
		<>
			{username === "" ? (
				<MustSignIn pageName="Favorites" />
			) : (
				<>
					{isPro === null ? (
						<div className="w-full h-full flex justify-center items-center">
							<Loader className="w-10 h-10 animate-spin" />
						</div>
					) : isPro ? (
						<div className="w-full h-full flex justify-center items-center gap-4 flex-col py-24">
							<h1 className="text-xl font-semibold">
								Favorites page
							</h1>
							<p>You have no favorite book yet</p>
						</div>
					) : (
						<PleaseUpgrade />
					)}
				</>
			)}
		</>
	);
}
