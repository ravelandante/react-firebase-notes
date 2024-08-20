import { collection, addDoc, getDocs, query, where, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

const notesCollection = collection(db, "notes");

export const getSavedNotes = async (userId) => {
	try {
		const q = query(notesCollection, where("userid", "==", userId));
		return await getDocs(q);
	} catch (e) {
		console.error("Error getting documents: ", e);
	}
};

export const createNote = async (title, content, userid, x, y) => {
	try {
		return await addDoc(notesCollection, {
			title: title,
			content: content,
			userid: userid,
			x: x,
			y: y,
		});
	} catch (e) {
		console.error("Error adding document: ", e);
	}
};

export const updateNote = async (docId, title, content, x, y) => {
	try {
		return await updateDoc(doc(db, "notes", docId), {
			title: title,
			content: content,
			x: x,
			y: y,
		});
	} catch (e) {
		console.error("Error updating document: ", e);
	}
};

export const deleteNote = async (docId) => {
	try {
		await deleteDoc(doc(db, "notes", docId));
	} catch (e) {
		console.error("Error deleting document: ", e);
	}
};
