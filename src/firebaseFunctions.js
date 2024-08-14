import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export const getSavedNotes = async (userId) => {
	try {
		const q = query(collection(db, "notes"), where("userid", "==", userId));
		return await getDocs(q);
	} catch (e) {
		console.error("Error getting documents: ", e);
	}
};

export const createNote = async (title, userid) => {
	try {
		return await addDoc(collection(db, "notes"), {
			title: title,
			content: "",
			userid: userid,
		});
	} catch (e) {
		console.error("Error adding document: ", e);
	}
};
