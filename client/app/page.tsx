"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader } from "lucide-react";

import { searchBooks } from "@/app/functions/books";
import LoadingBook from "@/components/homemade/loadingbook";

interface BookRetrieved {
	kind: string;
	id: string;
	etag: string;
	volumeInfo: {
		title: string;
		authors: string[];
		publisher: string;
		publishedDate: string;
		description: string;
		categories: string[];
		imageLinks?: {
			smallThumbnail?: string;
			thumbnail?: string;
		};
	};
	saleInfo: {
		retailPrice: {
			amount: number;
			currencyCode: string;
		};
	};
}

export default function Home() {
	const [searchValue, setSearchValue] = useState("");

	const [loadingBooks, setLoadingBooks] = useState(false);
	const [books, setBooks] = useState<BookRetrieved[] | []>([]);

	const userTyped = (value: string) => {
		setSearchValue(value);
	};

	const findingBookTrigered = () => {
		setLoadingBooks(true);

		setBooks([]);

		const formattedSearchValue = searchValue.replace(/\s/g, "+");

		searchBooks(formattedSearchValue).then((books) => {
			if (books) {
				for (const book of books) {
					setBooks(
						(prevBooks) => [...prevBooks, book] as BookRetrieved[]
					);
				}
			}
			setLoadingBooks(false);
		});
	};

	function openThisBook() {
		alert("Book was clicked");
	}

	return (
		<div className="flex flex-col gap-2 lg:gap-4 max-w-7xl mx-auto w-full py-4">
			{/* SEARCH SECTION */}
			<section className="w-full flex">
				<div className="flex w-full max-w-lg items-center space-x-4 p-4">
					<Input
						type="search"
						value={searchValue}
						placeholder="Search"
						onChange={(event) => userTyped(event.target.value)}
					/>
					<Button onClick={findingBookTrigered}>
						{loadingBooks ? (
							<>
								<Loader className="h-5 w-5 animate-spin" />
							</>
						) : (
							"Find a Book"
						)}
					</Button>
				</div>
			</section>

			{/* WAS SEARCH MADE ALREADY ? */}
			{books.length === 0 && !loadingBooks && (
				<section className="w-full h-full px-4">
					<div className="grid grid-cols-2 lg:grid-cols-7 gap-4">
						{Array.from({ length: 20 }).map((_, index) => (
							<LoadingBook key={index} />
						))}
					</div>
				</section>
			)}

			{/* SEARCH WAS MADE */}
			{loadingBooks ? (
				<section className="w-full h-full px-4">
					<div className="grid grid-cols-2 lg:grid-cols-7 gap-4">
						{Array.from({ length: 20 }).map((_, index) => (
							<LoadingBook key={index} />
						))}
					</div>
				</section>
			) : (
				<section className="w-full h-full">
					<div className="grid grid-cols-2 lg:grid-cols-7 gap-2">
						{books.map((book) => (
							<Button
								onClick={openThisBook}
								variant="link"
								key={book.id}
								className="w-full h-full flex flex-col gap-2 items-start"
							>
								<img
									className="h-40 w-full rounded"
									src={book.volumeInfo.imageLinks?.thumbnail}
								/>
								<p className="overflow-hidden truncate font-bold w-full text-start">
									{book.volumeInfo.title}
								</p>
								<div className="text-start text-xs w-full flex flex-col gap-1">
									<p className="text-slate-400 truncate overflow-hidden">
										by {book.volumeInfo.authors}
									</p>
									<p className="text-yellow-600 truncate overflow-hidden">
										{book.saleInfo.retailPrice
											? `$${book.saleInfo.retailPrice.amount}`
											: "Out of stock"}
									</p>
								</div>
							</Button>
						))}
					</div>
				</section>
			)}
		</div>
	);
}
