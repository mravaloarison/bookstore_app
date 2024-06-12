import { Heart, ShoppingCart, Users } from "lucide-react";
import { Button } from "../ui/button";
import { DrawerDescription, DrawerHeader } from "../ui/drawer";

interface Book {
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

const JoinCommunity = (bookId: string) => {
	console.log("Joining community for book", bookId);
};

export default function BookDetails({ book }: { book: Book }) {
	return (
		<div>
			<DrawerHeader>
				<h1 className="text-center font-mono font-semibold">
					{book.volumeInfo.title}
				</h1>
			</DrawerHeader>
			<DrawerDescription className="p-8 overflow-scroll flex flex-col md:flex-row md:items-center md:max-w-5xl md:mx-auto md:w-full gap-4">
				<div className="flex flex-col justify-center items-center gap-4 md:w-[28rem]">
					<img
						className="w-48 h-52 md:h-72 md:w-full rounded-md"
						src={book.volumeInfo.imageLinks?.thumbnail}
						alt={book.volumeInfo.title}
					/>
					<Button
						onClick={() => JoinCommunity(book.id)}
						className="flex gap-4 w-full"
					>
						<Users className="w-5 h-5" />
						Join community
					</Button>
					<Button variant="secondary" className="flex gap-4 w-full">
						<Heart className="w-5 h-5" />
						Add to favorite
					</Button>
					{book.saleInfo.retailPrice ? (
						<Button
							variant="secondary"
							className="flex gap-4 w-full"
						>
							<ShoppingCart className="w-5 h-5" />
							Buy{" "}
							<>
								{book.saleInfo.retailPrice.amount}{" "}
								{book.saleInfo.retailPrice.currencyCode}
							</>
						</Button>
					) : (
						""
					)}
				</div>
				<div className="w-full flex flex-col gap-4 px-4">
					<p>
						<strong>Authors:</strong>{" "}
						{book.volumeInfo.authors.join(", ")}
					</p>
					<p>
						<strong>Publisher:</strong> {book.volumeInfo.publisher}
					</p>
					<p>
						<strong>Published Date:</strong>{" "}
						{book.volumeInfo.publishedDate}
					</p>
					<p>
						<strong>Categories:</strong>{" "}
						{book.volumeInfo.categories.join(", ")}
					</p>
					<p className="truncate md:text-wrap">
						<strong>Description:</strong>{" "}
						{book.volumeInfo.description}
					</p>
				</div>
			</DrawerDescription>
		</div>
	);
}
