"use client";

import MembershipCard from "@/components/homemade/membership_card";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import {
	addProMembers,
	deleteProMembers,
	isProMember,
} from "../functions/authentication";
import { toast } from "sonner";

export default function Membership() {
	const [isPro, setIsPro] = useState(false);
	const [isClassic, setIsClassic] = useState(true);
	let activePlan = "Classic";

	useEffect(() => {
		console.log(isProMember(sessionStorage.getItem("user")));
		activePlan = isProMember(sessionStorage.getItem("user"))
			? "Pro"
			: "Classic";
	});

	const handleClassicClick = () => {
		setIsPro(false);
		setIsClassic(true);
	};

	const handleProClick = () => {
		setIsPro(true);
		setIsClassic(false);
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

	const handleSaveChanges = () => {
		const promise = () =>
			new Promise((resolve) =>
				setTimeout(() => {
					isPro
						? addProMembers(sessionStorage.getItem("user"))
						: deleteProMembers(sessionStorage.getItem("user"));
					resolve({ msg: "Your plan has been updated" });
				}, 2000)
			);

		toast.promise(promise, {
			loading: "Loading...",
			success: (data: any) => {
				return data.msg;
			},
			error: "Error",
		});
	};

	return (
		<div className="flex flex-col gap-8 w-full h-full items-center py-8">
			<h1 className="text-center text-xl flex gap-2">
				Active Plan: <span className="font-bold">{activePlan}</span>
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
					<Save className="w-5 h-5 mr-2" />
					Save changes
				</Button>
			</div>
		</div>
	);
}
