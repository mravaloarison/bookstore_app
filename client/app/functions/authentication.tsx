import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyBdG1pse58xuZBGr_NZzq_KT08TiFWdeRs",
	authDomain: "bookstore-27877.firebaseapp.com",
	projectId: "bookstore-27877",
	storageBucket: "bookstore-27877.appspot.com",
	messagingSenderId: "621257385604",
	appId: "1:621257385604:web:274bf23723f1059abf44d1",
};

interface SignInCallback {
	(error?: Error): void;
}
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export const signInWithGoogle = (callback: SignInCallback) => {
	signInWithPopup(auth, provider)
		.then((result) => {
			const user = result.user;
			user.displayName &&
				sessionStorage.setItem("user", user.displayName);
			callback();
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
