"use client";

import { useState, useEffect } from "react";
import PleaseUpgrade from "@/components/homemade/please_upgrade";
import { isProMember, getCommunity } from "../functions/authentication";
import { Loader } from "lucide-react";
import MustSignIn from "@/components/homemade/must_sign_in";
import { Input } from "@/components/ui/input";

interface CommunityInter {
	bookId: string;
	bookImg: string | undefined;
	bookName: string;
	joinedAt: string;
	members: string[];
}

export default function Community() {
	const [username, setUsername] = useState("");
	const [isPro, setIsPro] = useState(null);
	const [community, setCommunity] = useState<CommunityInter[] | []>([]);

	useEffect(() => {
		const username = sessionStorage.getItem("user");
		if (username) {
			setUsername(username);
			isProMember(username)
				.then((isProMemberResult: any) => setIsPro(isProMemberResult))
				.catch((error) => console.error(error));
		}

		setCommunity(getCommunity());
	}, []);

	return (
		<>
			{username === "" ? (
				<MustSignIn pageName="Community" />
			) : (
				<>
					{isPro === null ? (
						<div className="w-full h-full min-h-96 flex justify-center items-center">
							<Loader className="w-10 h-10 animate-spin" />
						</div>
					) : isPro ? (
						<>
							{community.length === 0 ? (
								<div className="w-full h-full flex justify-center items-center gap-4 flex-col py-24">
									<h1 className="text-xl font-semibold">
										Community page
									</h1>
									<p>You did not join a community yet</p>
								</div>
							) : (
								<>
									<div className="py-6 px-8">
										<Input
											type="text"
											placeholder="Search for a community"
											className="w-full max-w-2xl mx-auto"
										/>
									</div>
									{community.map((doc) => {
										return (
											<div
												key={doc.bookId}
												className="w-full flex items-center gap-4 p-4 border-b max-w-2xl mx-auto"
											>
												<img
													src={doc.bookImg}
													alt={doc.bookName}
													className="w-20 h-20 rounded-lg"
												/>
												<div className="flex flex-col gap-2 text-sm">
													<p className="font-bold">
														{doc.bookName}
													</p>
													<p>
														{doc.members.length}{" "}
														members
													</p>
												</div>
											</div>
										);
									})}
								</>
							)}
						</>
					) : (
						<PleaseUpgrade />
					)}
				</>
			)}
		</>
	);
}
