"use client";

import { useEffect } from "react";

export default function FavoritesPage() {
	useEffect(() => {
		sessionStorage.getItem("user") || window.location.replace("/");
	});
	return (
		<div>
			<h1>Favorites</h1>
		</div>
	);
}
