"use client";

import { useEffect } from "react";

export default function ReportsPage() {
	useEffect(() => {
		sessionStorage.getItem("user") || window.location.replace("/");
	});

	return (
		<div>
			<h1>Reports</h1>
		</div>
	);
}
