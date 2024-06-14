"use client";

import { useEffect } from "react";

export default function Community() {
	useEffect(() => {
		sessionStorage.getItem("user") || window.location.replace("/");
	});
	return (
		<div className="flex flex-col gap-4 w-full h-full items-center">
			<h1 className="text-4xl font-bold">Community</h1>
			<p className="text-lg">The team is still working on this page</p>
		</div>
	);
}
