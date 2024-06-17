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
	safeInfo: {
		listPrice: {
			amount: number;
		};
	};
}

export function searchBooks(searchValue: string) {
	const searchQuery = searchValue.replace(/\s/g, "+");
	const request = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=20`;
	return fetch(request).then((response) => {
		if (response.ok) {
			return response.json().then((data) => {
				const books: Book[] = data.items;
				return books;
			});
		}
	});
}
