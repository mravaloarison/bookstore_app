"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader, Search } from "lucide-react";

import { searchBooks } from "@/app/functions/books";
import LoadingBook from "@/components/homemade/loadingbook";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import BookDetails from "@/components/homemade/book_details";
import LoadedBook from "@/components/homemade/loaded_book";

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

	const DrawerComponent = ({ trigger, content }: any) => {
		return (
			<Drawer>
				<DrawerTrigger>{trigger}</DrawerTrigger>
				<DrawerContent>{content}</DrawerContent>
			</Drawer>
		);
	};

	return (
		<div className="flex flex-col gap-2 lg:gap-4 max-w-7xl mx-auto w-full lg:py-4">
			<section className="w-full flex">
				<div className="flex w-full max-w-lg mx-auto items-center space-x-4 p-4">
					<Input
						type="search"
						value={searchValue}
						placeholder="Search"
						onChange={(event) => userTyped(event.target.value)}
					/>
					<Button onClick={findingBookTrigered} variant="secondary">
						{loadingBooks ? (
							<>
								<Loader className="h-5 w-5 animate-spin" />
							</>
						) : (
							<Search className="h-5 w-5" />
						)}
					</Button>
				</div>
			</section>

			{books.length === 0 && !loadingBooks && (
				<section className="w-full h-[30rem] md:h-[34rem] px-4">
					<p className="text-slate-300 text-sm text-center">
						Search for a book to get started
					</p>
				</section>
			)}

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
					<div className="grid grid-cols-2 lg:grid-cols-7 gap-4 px-4">
						{books.map((book, index) => (
							<DrawerComponent
								key={index}
								trigger={<LoadedBook book={book} />}
								content={<BookDetails book={book} />}
							/>
						))}
					</div>
				</section>
			)}
		</div>
	);
}
