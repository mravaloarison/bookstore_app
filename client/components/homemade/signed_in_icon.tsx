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
	LogOut,
	MessageSquareWarning,
	ShoppingCart,
	Users,
} from "lucide-react";
import { signOut } from "@/app/functions/authentication";

const menuItems = [
	{
		icon: Heart,
		text: "My Favorites",
	},
	{
		icon: Users,
		text: "Community",
	},
	{
		icon: MessageSquareWarning,
		text: "Reports",
	},
	{
		icon: ShoppingCart,
		text: "Purchase History",
	},
];

export default function SignedInIcon() {
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
				<DropdownMenuLabel>
					{sessionStorage.getItem("user")}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{menuItems.map((item, index) => (
					<DropdownMenuItem
						key={index}
						className="hover:cursor-pointer"
					>
						<item.icon className="w-4 h-4 mr-2" />
						{item.text}
					</DropdownMenuItem>
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
