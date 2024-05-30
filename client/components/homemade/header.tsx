import { Button } from "../ui/button";

export default function Header() {
	return (
		<header className="p-4 flex w-full justify-between items-center border-b">
			<h1 className="text-xl font-extrabold font-mono text-slate-500">
				<span className="text-yellow-600">Book</span>Store
			</h1>
			<div className="flex gap-8 items-center">
				<Button variant="secondary">Sign in with Google</Button>
			</div>
		</header>
	);
}
