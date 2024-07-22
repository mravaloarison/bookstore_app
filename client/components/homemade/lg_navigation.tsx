"use client";

import {
	Crown,
	Heart,
	Home,
	MessageSquareWarning,
	ShoppingCart,
	Sparkles,
	Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
	{
		icon: Home,
		text: "Home",
		path: "/",
	},
	{
		icon: Heart,
		text: "My Favorites",
		path: "/favorites",
	},
	{
		icon: ShoppingCart,
		text: "Purchase History",
		path: "/purchase",
	},
	{
		icon: Users,
		text: "Community",
		path: "/community",
	},
	{
		icon: Sparkles,
		text: "Ask AI",
		path: "/ai_recommendations",
	},
	{
		icon: Crown,
		text: "Membership",
		path: "/membership",
	},
];

export default function Navigation() {
	const pathName = usePathname();
	console.log(pathName);

	return (
		<div className="flex justify-center items-center w-full gap-2 border-b pb-4">
			{menuItems.map((item, index) => {
				return (
					<Link
						href={item.path}
						key={index}
						className={`
							${
								pathName === item.path ? ` bg-slate-50` : ""
							} group flex items-center gap-2 hover:cursor-pointer hover:bg-slate-50 rounded-lg px-4 py-2
                            `}
					>
						<item.icon
							size={18}
							className={`${
								index === 4 &&
								"fill-indigo-500 stroke-indigo-500"
							} ${
								index === 6 &&
								"fill-yellow-500 stroke-yellow-500"
							} group-hover:scale-110 transition-transform duration-300`}
						/>
						<span className="text-sm">{item.text}</span>
					</Link>
				);
			})}
		</div>
	);
}
