"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface BookInfoProps {
	accessInfo?: any;
	volumeInfo: {
		title: string;
		authors: string[];
		publisher: string;
		publishedDate: string;
		description: string;
		imageLinks?: {
			thumbnail?: string;
			smallThumbnail?: string;
		};
		categories?: string[];
		averageRating?: number;
		ratingsCount?: number;
	};
	saleInfo: {
		listPrice: {
			amount: number;
		};
	};
}

export default function Home() {
	const [searchValue, setSearchValue] = useState("");
	const [loadingBooks, setLoadingBooks] = useState(false);
	const searchAction = () => {
		// Endpoints: https://www.googleapis.com/books/v1/volumes?q=

		// Change all the spaces to a plus sign
		// REGEX: /\s/g == " "

		setLoadingBooks(true);

		console.log("\nNew response\n");
		const searchQuery = searchValue.replace(/\s/g, "+");
		const request = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`;
		fetch(request).then((response) => {
			if (response.ok) {
				response.json().then((data) => {
					// console.log(data);
					// parse ARRAY of books
					const books = data.items;
					books.forEach((Element: BookInfoProps) => {
						console.log(Element.volumeInfo.title);
						console.log(Element.volumeInfo.authors);
						console.log(Element.volumeInfo.publisher);
						console.log(Element.volumeInfo.publishedDate);
						console.log(Element.volumeInfo.description);
						console.log(Element.volumeInfo.imageLinks);
						console.log(Element.volumeInfo.categories);
						console.log(Element.volumeInfo.averageRating);
						console.log(Element.volumeInfo.ratingsCount);
						// console.log(Element.saleInfo.listPrice.amount);
						console.log("\n\n");
					});
				});
				setLoadingBooks(false);
			}
		});
	};

	const userTyped = (value: string) => {
		setSearchValue(value);
	};

	return (
		<main>
			<section className="min-h-screen flex justify-center items-center">
				<div className="flex w-full max-w-sm items-center space-x-2">
					<Input
						type="search"
						value={searchValue}
						placeholder="Search"
						onChange={(event) => userTyped(event.target.value)}
					/>
					<Button onClick={searchAction}>
						{loadingBooks ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Searching ...
							</>
						) : (
							"Search"
						)}
					</Button>
				</div>
			</section>
		</main>
	);
}
