import {
	collection,
	doc,
	getDoc,
	updateDoc,
	arrayUnion,
} from "firebase/firestore";

import { db } from "./clientApp";
import { User } from "firebase/auth";

export const addFavorite = async (user: User | null | undefined, imdbid: string, poster: string, name: string) => {
	const userRef = collection(db, "users");
	try {
		await updateDoc(doc(userRef, user?.uid), {
			favorites: arrayUnion({
				imdbid,
				name,
				poster
			}),
		});
	} catch (err) {
		console.log(err);
	}
}

export const getUser = async (user: User | null | undefined,) => {
	const userRef = doc(db, "users", user?.uid?user.uid:"");
	const userDetails = await getDoc(userRef);
	console.log(userDetails.data())
	return userDetails.data();

}
