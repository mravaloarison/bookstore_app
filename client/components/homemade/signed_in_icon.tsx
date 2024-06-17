import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
	CircleUser,
	Crown,
	Heart,
	Home,
	LogOut,
	MessageSquareWarning,
	ShoppingCart,
	Sparkles,
	Users,
} from "lucide-react";
import { signOut } from "@/app/functions/authentication";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function SignedInIcon() {
	const [user, setUser] = useState("");

	const menuItems = [
		{
			icon: Home,
			text: "Home",
			path: "/",
		},
		{
			icon: Heart,
			text: "My Favorites",
			path: "favorites",
		},
		{
			icon: ShoppingCart,
			text: "Purchase History",
			path: "purchase",
		},
		{
			icon: Users,
			text: "Community",
			path: "community",
		},
		{
			icon: Sparkles,
			text: "Ask AI",
			path: "ai_recommendations",
		},
		{
			icon: MessageSquareWarning,
			text: "Reports",
			path: "reports",
		},
		{
			icon: Crown,
			text: "Membership",
			path: "membership",
		},
	];

	useEffect(() => {
		setUser(sessionStorage.getItem("user") || "");
	}, [user]);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="secondary"
					size="icon"
					className="rounded-full"
				>
					<CircleUser className="w-5 h-5" />
					<span className="sr-only">Toggle user menu</span>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end">
				<DropdownMenuLabel>{user}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{menuItems.map((item, index) => (
					<Link href={item.path} key={index}>
						<DropdownMenuItem className="bg-primary/50">
							<item.icon className="w-4 h-4 mr-2" />
							{item.text}
						</DropdownMenuItem>
					</Link>
				))}
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() => {
						signOut();
					}}
					className="hover:cursor-pointer"
				>
					<LogOut className="w-4 h-4 mr-2" />
					Sign Out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
