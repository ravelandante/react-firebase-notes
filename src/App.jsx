import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

import { useState } from "react";

import "./App.css";
import NotesList from "./components/NotesList";

const notesList = [];

function App() {
	const [notes, setNotes] = useState(notesList);

	const googleSignIn = () => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				console.log(user.displayName);
			} else {
				console.log("No user");
			}
		});

		const provider = new GoogleAuthProvider();

		signInWithPopup(auth, provider);
	};

	const createNote = async () => {
		const incrementedId = (notes.at(-1)?.id ?? 0) + 1;
		setNotes([...notes, { id: incrementedId, title: "New note" }]);

		try {
			const docRef = await addDoc(collection(db, "notes"), {
				title: "New note",
				content: "",
				userid: signedInUser.uid,
			});
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	};

	return (
		<>
			{signedInUser && (
				<>
					<div>
						<button onClick={createNote}>Add new note</button>
					</div>
					<div>
						<NotesList notes={notes} />
					</div>
				</>
			)}

			{!signedInUser && <button onClick={googleSignIn}>Sign in with Google</button>}
		</>
	);
}

export default App;
