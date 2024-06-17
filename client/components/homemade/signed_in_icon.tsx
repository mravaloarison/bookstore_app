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
	Heart,
	Home,
	LogOut,
	MessageSquareWarning,
	ShoppingCart,
	Users,
} from "lucide-react";
import { signOut } from "@/app/functions/authentication";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function SignedInIcon() {
	const [user, setUser] = useState("");

	const pathname = usePathname();

	const menuItems = [
		{
			icon: Home,
			text: "Home",
			path: "/",
			isActive: pathname === "/",
		},
		{
			icon: Heart,
			text: "My Favorites",
			path: "favorites",
			isActive: pathname.includes("favorites"),
		},
		{
			icon: Users,
			text: "Community",
			path: "community",
			isActive: pathname.includes("community"),
		},
		{
			icon: MessageSquareWarning,
			text: "Reports",
			path: "reports",
			isActive: pathname.includes("reports"),
		},
		{
			icon: ShoppingCart,
			text: "Purchase History",
			path: "purchase",
			isActive: pathname.includes("purchase"),
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
