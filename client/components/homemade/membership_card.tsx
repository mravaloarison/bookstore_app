import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "../ui/card";
import { Check, X } from "lucide-react";

interface MembershipCardType {
	name: string;
	features: string[];
	price: string;
}

const allFeatures = [
	"Access purchase history",
	"Can make reports",
	"Join community",
	"Ask AI for recommendations",
	"Can add to Favorites",
];

export default function MembershipCard({
	isActive,
	handleClick,
	plan,
}: {
	isActive: boolean;
	handleClick: () => void;
	plan: MembershipCardType;
}) {
	return (
		<Card
			onClick={handleClick}
			className={`
                    ${
						isActive && plan.name === "Pro"
							? "border-indigo-500 border-4"
							: isActive && plan.name === "Classic"
							? "border-slate-500 border-4"
							: ""
					}
                    cursor-pointer
                `}
		>
			<CardHeader>
				<CardTitle className="text-slate-500">{plan.name}</CardTitle>
			</CardHeader>
			<CardContent>
				<ul className="flex flex-col gap-2">
					{allFeatures.map((feature) => (
						<li key={feature} className="flex gap-2">
							{plan.features.includes(feature) ? (
								<Check className="w-5 h-5 text-green-500" />
							) : (
								<X className="w-5 h-5 text-red-500" />
							)}
							{feature}
						</li>
					))}
				</ul>
			</CardContent>
			<CardFooter className="text-xl font-semibold text-slate-500">
				{plan.price}
			</CardFooter>
		</Card>
	);
}
