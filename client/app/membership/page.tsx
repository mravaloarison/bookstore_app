"use client";

import MembershipCard from "@/components/homemade/membership_card";
import { Button } from "@/components/ui/button";
import { Loader, Save } from "lucide-react";
import { useEffect, useState } from "react";
import {
	addProMembers,
	deleteProMembers,
	isProMember,
} from "../functions/authentication";
import { toast } from "sonner";
import MustSignIn from "@/components/homemade/must_sign_in";

export default function Membership() {
	const [isPro, setIsPro] = useState(false);
	const [username, setUsername] = useState("");

	const [isClassic, setIsClassic] = useState(true);
	const [activePlan, setActivePlan] = useState("");
	const [loadingChanges, setLoadingChanges] = useState(false);

	useEffect(() => {
		const username = sessionStorage.getItem("user");

		username && setUsername(username);

		isProMember(username).then((isProMemberResult) => {
			setIsPro(isProMemberResult);
			setIsClassic(!isProMemberResult);
			setActivePlan(isProMemberResult ? "Pro" : "Classic");
		});
	});

	const handleClassicClick = () => {
		setIsPro(false);
		setIsClassic(true);
	};

	const handleProClick = () => {
		setIsPro(true);
		setIsClassic(false);
	};

	const handleSaveChanges = () => {
		setLoadingChanges(true);
		const username = sessionStorage.getItem("user");

		const promise = () =>
			new Promise((resolve) =>
				setTimeout(() => {
					isPro
						? addProMembers(username)
						: deleteProMembers(username);
					resolve({
						msg: "Plan successfully updated!",
					});
				}, 1000)
			);

		toast.promise(promise, {
			loading: "Upgrading...",
			success: (data: any) => {
				setLoadingChanges(false);
				return data.msg;
			},
			error: "Error upgrading to Pro membership",
		});

		setTimeout(() => {
			window.location.reload();
		}, 2000);
	};

	const plans = [
		{
			name: "Classic",
			features: ["Access purchase history", "Can make reports"],
			price: "$0/month",
			callMeOnClick: handleClassicClick,
			active: isClassic,
		},
		{
			name: "Pro",
			features: [
				"Access purchase history",
				"Can make reports",
				"Join community",
				"Ask AI for recommendations",
				"Can add to Favorites",
			],
			price: "$20/month",
			callMeOnClick: handleProClick,
			active: isPro,
		},
	];

	return (
		<>
			{username === "" ? (
				<MustSignIn pageName="Membership" />
			) : activePlan !== "" ? (
				<div className="flex flex-col gap-8 w-full h-full items-center py-8 lg:py-16">
					<h1 className="text-center text-xl flex gap-2">
						Active Plan:{" "}
						<span className="font-bold">{activePlan}</span>
						<span className="flex h-2 w-2 translate-y-1 rounded-full bg-green-500" />
					</h1>
					<div className="md:grid md:grid-cols-2 md:gap-8 flex flex-col gap-4">
						{plans.map((plan) => (
							<MembershipCard
								key={plan.name}
								isActive={plan.active}
								handleClick={plan.callMeOnClick}
								plan={plan}
							/>
						))}
					</div>
					<div className="flex justify-center items-center">
						<Button variant="outline" onClick={handleSaveChanges}>
							{loadingChanges ? (
								<Loader className="w-5 h-5 mr-2 animate-spin" />
							) : (
								<Save className="w-5 h-5 mr-2" />
							)}
							Save changes
						</Button>
					</div>
				</div>
			) : (
				<div className="flex justify-center gap-8 w-full h-full items-center py-8">
					<Loader className="w-10 h-10 animate-spin" />
				</div>
			)}
		</>
	);
}
