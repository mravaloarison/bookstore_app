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

export default function LoadedBook({ book }: { book: Book }) {
	return (
		<div className="w-full h-full flex flex-col gap-2 items-start">
			<img
				className="h-48 w-full rounded-lg"
				src={book.volumeInfo.imageLinks?.thumbnail}
			/>
			<p className="overflow-hidden truncate font-semibold w-full text-start">
				{book.volumeInfo.title}
			</p>
			<div className="text-start text-xs w-full flex flex-col gap-1.5">
				<p className="text-slate-300 truncate overflow-hidden tracking-wide">
					by {book.volumeInfo.authors}
				</p>
				<p className="text-yellow-500 font-mono truncate overflow-hidden">
					{book.saleInfo.retailPrice
						? `$${book.saleInfo.retailPrice.amount}`
						: "Out of stock"}
				</p>
			</div>
		</div>
	);
}
