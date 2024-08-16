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

export const createNote = async (title, content, userid) => {
	try {
		return await addDoc(collection(db, "notes"), {
			title: title,
			content: content,
			userid: userid,
		});
	} catch (e) {
		console.error("Error adding document: ", e);
	}
};

export const removeDoc = async (docId) => {
	try {
		await deleteDoc(doc(db, "notes", docId));
	} catch (e) {
		console.error("Error deleting document: ", e);
	}
};
