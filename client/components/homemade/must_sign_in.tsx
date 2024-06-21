import { AlertTriangle } from "lucide-react";

export default function MustSignIn({ pageName }: { pageName: string }) {
	return (
		<div className="w-full h-full max-w-xl mx-auto flex gap-4 flex-col py-8 md:py-24">
			<div className="text-xl text-slate-300 font-semibold flex flex-col justify-center items-center gap-4">
				<span>
					<AlertTriangle className="h-8 w-8 text-yellow-500" />
				</span>
				<p>Please sign in to access {pageName} page</p>
			</div>
		</div>
	);
}
