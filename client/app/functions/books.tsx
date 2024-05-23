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
}

export const extract_book_info = async (book: BookInfoProps) => {
	const book_info = {
		title: book.volumeInfo.title,
		authors: book.volumeInfo.authors,
		publisher: book.volumeInfo.publisher,
		publishedDate: book.volumeInfo.publishedDate,
		description: book.volumeInfo.description,
		imageLinks: book.volumeInfo.imageLinks,
		categories: book.volumeInfo.categories,
		averageRating: book.volumeInfo.averageRating,
		ratingsCount: book.volumeInfo.ratingsCount,
	};
	return book_info;
};
