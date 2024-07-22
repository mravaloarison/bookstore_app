import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	reload,
} from "firebase/auth";
import {
	getFirestore,
	addDoc,
	collection,
	getDocs,
	deleteDoc,
	setDoc,
	doc,
	getDoc,
	QuerySnapshot,
} from "firebase/firestore";
import { conf } from "./firebase_config";

const firebaseConfig = conf;

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

interface SignInCallback {
	(error?: Error): void;
}

function getFormattedJoinedAt(): string {
	const now = new Date();

	const joinedAt = new Date(now.getTime());

	const options: Intl.DateTimeFormatOptions = {
		year: "numeric" as const,
		month: "long" as const,
		day: "numeric" as const,
		hour: "numeric" as const,
		minute: "2-digit" as const,
		hour12: true,
	};
	const formatter = new Intl.DateTimeFormat("en-US", {
		...options,
		timeZone: "America/New_York",
	});
	const formattedDateTime = formatter.format(joinedAt);

	return formattedDateTime;
}

export const signInWithGoogle = (callback: SignInCallback) => {
	signInWithPopup(auth, provider)
		.then((result) => {
			const user = result.user;

			user.displayName &&
				sessionStorage.setItem("user", user.displayName);

			user.uid && sessionStorage.setItem("userId", user.uid);
			callback();

			// add user to firestore
			addingUser(user.displayName, user.uid);
		})
		.catch((error) => {
			console.log(error);
		});
};

export const signOut = () => {
	sessionStorage.removeItem("user");
	auth.signOut();

	window.location.reload();
};

const db = getFirestore(app);

export const addingUser = (username: string | null, uid: string) => {
	getDocs(collection(db, "users")).then((querySnapshot) => {
		let userExists = false;

		// look if user exists already in users/userId
		querySnapshot.forEach((doc) => {
			if (doc.data().userId === uid) {
				userExists = true;
				return;
			}
		});

		if (!userExists) {
			addDoc(collection(db, "users"), {
				userId: uid,
				userName: username,
			});
		}
	});
};

export const addProMembers = (username: string | null) => {
	getDocs(collection(db, "proMembers")).then((querySnapshot) => {
		let userExists = false;

		querySnapshot.forEach((doc) => {
			if (doc.data().userName === username) {
				userExists = true;
				return;
			}
		});

		if (!userExists) {
			addDoc(collection(db, "proMembers"), {
				userName: username,
				joinedAt: getFormattedJoinedAt(),
			});
		}
	});
};

export const deleteProMembers = (username: string | null) => {
	getDocs(collection(db, "proMembers")).then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			if (doc.data().userName === username) {
				deleteDoc(doc.ref);
			}
		});
	});
};

export function isProMember(username: string | null): Promise<boolean> {
	return new Promise((resolve, reject) => {
		getDocs(collection(db, "proMembers"))
			.then((querySnapshot) => {
				const isPro = querySnapshot.docs.some(
					(doc) => doc.data().userName === username
				);
				resolve(isPro);
			})
			.catch((error) => {
				console.error("Error checking pro member status:", error);
				reject(false);
			});
	});
}

export function addToCommunity(
	bookId: string,
	bookName: string | null,
	bookImg: string | undefined,
	username: string | null
) {
	const BookRef: any = collection(db, "community");

	const res = getDoc(doc(BookRef, bookId)).then((docSnap: any) => {
		if (docSnap.exists()) {
			const members = docSnap.data().members;

			if (!members.includes(username)) {
				setDoc(doc(BookRef, bookId), {
					bookId: bookId,
					bookName: bookName,
					bookImg: bookImg,
					members: [...docSnap.data().members, username],
				});

				return {
					message: "Community joined successfully!",
					status: 200,
				};
			}

			return {
				message: "You are already a member of this community!",
				status: 500,
			};
		} else {
			setDoc(doc(BookRef, bookId), {
				bookId: bookId,
				bookName: bookName,
				bookImg: bookImg,
				members: [username],
			});

			return { message: "Community joined successfully!", status: 200 };
		}
	});

	return res;
}

export function getCommunity() {
	let res: any[] = [];
	getDocs(collection(db, "community")).then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			res.push(doc.data());
		});
	});

	return res;
}

export function addToFavorite(bookId: string, userName: string | null) {
	const BookRef: any = collection(db, "favorites");

	const res = getDoc(doc(BookRef, userName ? userName : "Empty")).then(
		(docSnap: any) => {
			if (docSnap.exists()) {
				const booksInUserFavorites = docSnap.data().books;

				if (booksInUserFavorites.includes(bookId)) {
					return {
						message:
							"You already have this book in your favorites!",
						status: 201,
					};
				}

				setDoc(doc(BookRef, userName ? userName : "Empty"), {
					books: [...docSnap.data().books, bookId],
				});

				return {
					message: "You already have this book in your favorites!",
					status: 200,
				};
			}

			setDoc(doc(BookRef, userName ? userName : "Empty"), {
				books: [bookId],
			});

			return {
				message: "Book added to favorites successfully!",
				status: 200,
			};
		}
	);

	return res;
}

export function addToPurchase(bookId: string, userName: string | null) {
	const BookRef: any = collection(db, "purchases");

	const res = getDoc(doc(BookRef, userName ? userName : "Empty")).then(
		(docSnap: any) => {
			if (docSnap.exists()) {
				const booksInUserPurchases = docSnap.data().books;

				if (booksInUserPurchases.includes(bookId)) {
					return {
						message:
							"You already have this book in your purchases!",
						status: 201,
					};
				}

				setDoc(doc(BookRef, userName ? userName : "Empty"), {
					books: [...docSnap.data().books, bookId],
				});

				return {
					message: "You already have this book in your purchases!",
					status: 200,
				};
			}

			setDoc(doc(BookRef, userName ? userName : "Empty"), {
				books: [bookId],
			});

			return {
				message: "Book added to purchases successfully!",
				status: 200,
			};
		}
	);

	return res;
}

export function getFavorites(userName: string | null) {
	const BookRef: any = collection(db, "favorites");

	return getDoc(doc(BookRef, userName ? userName : "Empty")).then(
		(docSnap: any) => {
			if (docSnap.exists()) {
				return docSnap.data().books;
			}

			return [];
		}
	);
}

export function getPurchases(userName: string | null) {
	const BookRef: any = collection(db, "purchases");

	return getDoc(doc(BookRef, userName ? userName : "Empty")).then(
		(docSnap: any) => {
			if (docSnap.exists()) {
				return docSnap.data().books;
			}

			return [];
		}
	);
}

export function removeFromFavorites(bookId: string, userName: string | null) {
	const BookRef: any = collection(db, "favorites");

	getDoc(doc(BookRef, userName ? userName : "Empty")).then((docSnap: any) => {
		if (docSnap.exists()) {
			const booksInUserFavorites = docSnap.data().books;

			const newBooks = booksInUserFavorites.filter(
				(book: string) => book !== bookId
			);

			setDoc(doc(BookRef, userName ? userName : "Empty"), {
				books: newBooks,
			}).then(() => {
				window.location.reload();
			});
		}
	});
}

export function removeFromPurchases(bookId: string, userName: string | null) {
	const BookRef: any = collection(db, "purchases");

	getDoc(doc(BookRef, userName ? userName : "Empty")).then((docSnap: any) => {
		if (docSnap.exists()) {
			const booksInUserPurchases = docSnap.data().books;

			const newBooks = booksInUserPurchases.filter(
				(book: string) => book !== bookId
			);

			setDoc(doc(BookRef, userName ? userName : "Empty"), {
				books: newBooks,
			}).then(() => {
				window.location.reload();
			});
		}
	});
}
