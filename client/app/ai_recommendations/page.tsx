"use client";

import { useState, useEffect } from "react";
import PleaseUpgrade from "@/components/homemade/please_upgrade";
import { isProMember } from "../functions/authentication";
import { Loader, Send, Sparkles, UserRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
				<div className="max-w-3xl mx-auto w-full">
					<div className="flex flex-col min-h-[80vh] w-full gap-4 px-4 py-2">
						<div className="flex flex-col gap-6">
							<div className="bg-slate-100 rounded-lg p-4">
								<h1 className="text-xl font-semibold">
									Ask AI for book recommendations
								</h1>

								<p className="pt-2 text-sm">
									AI will recommend you books based on your
									preferences, or answer any questions related
									to books.
								</p>
							</div>

							<div className="flex gap-4 items-start">
								<div className="border p-1 rounded-lg flex items-center">
									<UserRound className="w-4 h-4" />
								</div>
								<p className="text-sm">
									Here is supposed to be user question
								</p>
							</div>

							<div className="flex gap-4 items-start">
								<div className="border p-1 rounded-lg flex items-center">
									<Sparkles className="w-4 h-4 fill-indigo-500 stroke-indigo-500" />
								</div>
								<p className="text-sm">
									Hello I am an AI and I am here to respond to
									all your questions
								</p>
							</div>
						</div>
						<div className="fixed bottom-0 right-0 left-0 p-4 max-w-3xl mx-auto w-full">
							<form
								className="flex gap-4"
								onSubmit={(e) => {
									e.preventDefault();

									// send user input to AI
									fetch("/api/chat", {
										method: "POST",
										body: JSON.stringify({
											message:
												"What book would you recomment me for thriller books",
										}),
									})
										.then((res) => res.text())
										.then((data) => console.log(data))
										.catch((error) => console.error(error));

									console.log("AI response");
								}}
							>
								<Input placeholder="Ask AI" />
								<Button type="submit" variant="secondary">
									<Send className="h-5 w-5" />
								</Button>
							</form>
						</div>
					</div>
				</div>
			) : (
				<PleaseUpgrade />
			)}
		</>
	);
}
