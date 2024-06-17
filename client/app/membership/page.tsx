"use client";

import MembershipCard from "@/components/homemade/membership_card";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useState } from "react";

export default function Membership() {
	const [isPro, setIsPro] = useState(false);
	const [isClassic, setIsClassic] = useState(true);

	const handleClassicClick = () => {
		setIsPro(false);
		setIsClassic(true);
	};

	const handleProClick = () => {
		setIsPro(true);
		setIsClassic(false);
	};

	const handleSaveChanges = () => {
		console.log("Saving changes");
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
		<div className="flex flex-col gap-8 w-full h-full items-center py-8">
			<h1 className="text-center text-xl flex gap-2">
				Active Plan: <span className="font-bold">Classic</span>
				<span className="flex h-2 w-2 translate-y-1 rounded-full bg-green-500" />
			</h1>
			<div className="md:grid md:grid-cols-2 md:gap-8 flex flex-col gap-4">
				{plans.map((plan) => (
					<MembershipCard
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
