"use client";

import { useEffect } from "react";

export default function PurchasePage() {
	useEffect(() => {
		sessionStorage.getItem("user") || window.location.replace("/");
	});
	return (
		<div>
			<h1>Purchase History</h1>
		</div>
	);
}
