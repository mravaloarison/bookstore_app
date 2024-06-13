import {
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { DropdownMenu } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { CircleUser } from "lucide-react";
import { signOut } from "@/app/functions/authentication";

export default function SignedInIcon() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="secondary"
					size="icon"
					className="rounded-full"
				>
					<CircleUser className="w-6 h-6" />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end">
				<DropdownMenuLabel>
					{sessionStorage.getItem("user")}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() => {
						signOut();
					}}
				>
					Sign Out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
