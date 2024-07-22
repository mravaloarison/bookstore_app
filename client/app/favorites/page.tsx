"use client";

import { useState, useEffect } from "react";
import PleaseUpgrade from "@/components/homemade/please_upgrade";
import {
	getFavorites,
	isProMember,
	removeFromFavorites,
} from "../functions/authentication";
import { Loader } from "lucide-react";
import MustSignIn from "@/components/homemade/must_sign_in";
import { getBooksById } from "../functions/books";
import { Button } from "@/components/ui/button";

export default function FavoritesPage() {
	const [username, setUsername] = useState("");
	const [isPro, setIsPro] = useState(null);
	const [favorites, setFavorites] = useState<any[]>([]);

	useEffect(() => {
		const username = sessionStorage.getItem("user");
		if (username) {
			setUsername(username);
			isProMember(username)
				.then((isProMemberResult: any) => setIsPro(isProMemberResult))
				.catch((error) => console.error(error));
		}
	});

	useEffect(() => {
		getFavorites(username).then((favorites: any) => {
			favorites.forEach((bookId: string) => {
				getBooksById(bookId).then((books: any) => {
					setFavorites((prevFavorites: any) => [
						...prevFavorites,
						{
							title: books.volumeInfo.title,
							thumbnail: books.volumeInfo.imageLinks.thumbnail,
							id: books.id,
						},
					]);
				});
			});
		});
	}, [username]);

	return (
		<>
			{username === "" ? (
				<MustSignIn pageName="Favorites" />
			) : (
				<>
					{isPro === null ? (
						<div className="w-full h-full flex justify-center items-center">
							<Loader className="w-10 h-10 animate-spin" />
						</div>
					) : isPro ? (
						<div className="w-full h-full flex justify-center items-center gap-4 flex-col py-8">
							<h1 className="text-xl font-semibold">
								Your favorite books
							</h1>
							{favorites.length > 0 ? (
								<div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 p-8 max-w-3xl mx-auto">
									{favorites.map(
										(favorite: any, index: number) => (
											<div
												key={index}
												className="flex flex-col items-center justify-center gap-2 w-full"
											>
												<img
													src={favorite.thumbnail}
													alt={favorite.title}
													className="w-24 h-24 object-cover"
												/>
												<p className="truncate w-full text-center">
													{favorite.title}
												</p>

												<Button
													variant="ghost"
													className="text-red-500"
													onClick={() => {
														removeFromFavorites(
															favorite.id,
															username
														);
													}}
												>
													Remove
												</Button>
											</div>
										)
									)}
								</div>
							) : (
								<p>You have no favorite book yet</p>
							)}
						</div>
					) : (
						<PleaseUpgrade />
					)}
				</>
			)}
		</>
	);
}
