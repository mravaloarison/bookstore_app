import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingBook() {
	return (
		<div className="w-full h-full flex flex-col gap-2 items-start">
			<Skeleton className="w-full h-48 rounded" />
			<Skeleton className="w-full h-3 rounded" />
			<Skeleton className="w-1/3 h-3 rounded" />
			<Skeleton className="w-1/4 h-3 rounded" />
		</div>
	);
}
