import { GlobeLock } from "lucide-react";

export default function PleaseUpgrade() {
	return (
		<div className="flex flex-col gap-4 w-full h-full items-center text-slate-200">
			<GlobeLock className="w-20 h-20" />
			<h1 className="text-4xl font-bold">Pro membership required</h1>
			<p className="text-lg">
				Please upgrade to pro membership to access this page.
			</p>
		</div>
	);
}
