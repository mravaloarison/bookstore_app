"use client";

import { useState, useEffect } from "react";
import PleaseUpgrade from "@/components/homemade/please_upgrade";
import { isProMember } from "../functions/authentication";
import { Loader } from "lucide-react";

export default function AiRecommendations() {
	const [isPro, setIsPro] = useState(null);

	useEffect(() => {
		const username = sessionStorage.getItem("user");
		if (username) {
			isProMember(username)
				.then((isProMemberResult: any) => setIsPro(isProMemberResult))
				.catch((error) => console.error(error));
		}
	}, []);

	return (
		<>
			{isPro === null ? (
				<div className="w-full h-full flex justify-center items-center">
					<Loader className="w-10 h-10 animate-spin" />
				</div>
			) : isPro ? (
				<div className="w-full h-full flex justify-center items-center gap-4 flex-col">
					<h1 className="text-xl font-semibold">
						AI Recommendations
					</h1>
					<p>AI Recommendations will be shown here</p>
				</div>
			) : (
				<PleaseUpgrade />
			)}
		</>
	);
}
