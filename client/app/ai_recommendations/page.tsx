"use client";

import { useState, useEffect, use } from "react";
import PleaseUpgrade from "@/components/homemade/please_upgrade";
import { isProMember } from "../functions/authentication";
import { Loader, Send, Sparkles, UserRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ChatHistory {
	user: string;
	ai: string;
}

const userInputType = (userInput: string) => {
	return (
		<div className="flex gap-4 items-start">
			<div className="border p-1 rounded-lg flex items-center">
				<UserRound className="w-4 h-4" />
			</div>
			<p className="text-sm">{userInput}</p>
		</div>
	);
};

const aiResponseType = (aiResponse: string, isLoading: boolean) => {
	return (
		<div className="flex gap-4 items-start">
			<div className="border p-1 rounded-lg flex items-center">
				<Sparkles className="w-4 h-4 fill-indigo-500 stroke-indigo-500" />
			</div>
			<p className="text-sm">
				{isLoading ? (
					<Loader className="w-4 h-4 animate-spin" />
				) : (
					aiResponse
				)}
			</p>
		</div>
	);
};

export default function AiRecommendations() {
	const [isPro, setIsPro] = useState(null);
	const [userInput, setUserInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [chatHistory, setChatHistory] = useState<ChatHistory>(
		{} as ChatHistory
	);

	useEffect(() => {
		const username = sessionStorage.getItem("user");
		if (username) {
			isProMember(username)
				.then((isProMemberResult: any) => setIsPro(isProMemberResult))
				.catch((error) => console.error(error));
		}
	}, []);

	const sendMessage = (message: string) => {
		setIsLoading(true);
		fetch("api/chat", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ message }),
		})
			.then((res) => res.text())
			.then((data) => {
				setChatHistory({ user: message, ai: data });
				setIsLoading(false);
			})
			.catch((error) => console.error(error));
		setUserInput("");
	};

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

							{aiResponseType(
								"Hello! How can I help you today?",
								false
							)}

							{/* CHAT */}
							<div className="flex flex-col gap-4">
								{chatHistory.user &&
									userInputType(chatHistory.user)}
								{chatHistory.ai &&
									aiResponseType(chatHistory.ai, isLoading)}
							</div>
						</div>
						<div className="fixed bottom-0 right-0 left-0 p-4 max-w-3xl mx-auto w-full">
							<form
								className="flex gap-4"
								onSubmit={(e) => {
									e.preventDefault();
									sendMessage(userInput);
								}}
							>
								<Input
									placeholder="Ask AI"
									value={userInput}
									onChange={(e) =>
										setUserInput(e.target.value)
									}
								/>
								<Button type="submit" variant="secondary">
									{isLoading ? (
										<Loader className="h-5 w-5 animate-spin" />
									) : (
										<Send className="h-5 w-5" />
									)}
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
