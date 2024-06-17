import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
	getFirestore,
	addDoc,
	collection,
	getDocs,
	deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyBdG1pse58xuZBGr_NZzq_KT08TiFWdeRs",
	authDomain: "bookstore-27877.firebaseapp.com",
	projectId: "bookstore-27877",
	storageBucket: "bookstore-27877.appspot.com",
	messagingSenderId: "621257385604",
	appId: "1:621257385604:web:274bf23723f1059abf44d1",
};

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

export const isProMember = (username: string | null) => {
	getDocs(collection(db, "proMembers")).then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			if (doc.data().userName === username) {
				return true;
			}
		});
	});

	return false;
};
