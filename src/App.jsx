import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import { useState } from "react";

import "./App.css";
import NotesList from "./components/NotesList";
import { NewNoteIcon } from "./components/Icons";
import { getSavedNotes, createNote } from "./firebaseFunctions";

function App() {
	const [notes, setNotes] = useState([]);
	const [signedInUser, setSignedInUser] = useState(null);
	const [maxZIndex, setMaxZIndex] = useState(0);

	const setSavedNotes = async (userId) => {
		const savedNotes = await getSavedNotes(userId);
		savedNotes.forEach((doc) => {
			setNotes((prevNotes) => [...prevNotes, { id: doc.id, ...doc.data() }]);
			setMaxZIndex((prevMaxZIndex) =>
				prevMaxZIndex < doc.data().zIndex ? doc.data().zIndex : prevMaxZIndex
			);
		});
	};

	const googleSignIn = () => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setSignedInUser(user);
				setSavedNotes(user.uid);
			} else {
				setSignedInUser(null);
			}
		});

		const provider = new GoogleAuthProvider();

		signInWithPopup(auth, provider);
	};

	const addNote = async () => {
		const title = "New note";
		const content = "";
		const position = { x: 0, y: 0 };
		const zIndex = 0;
		const newDoc = await createNote(title, content, signedInUser.uid, position.x, position.y, zIndex);

		setNotes([
			...notes,
			{ id: newDoc.id, title: title, content: content, x: position.x, y: position.y },
		]);
	};

	return (
		<>
			{signedInUser && (
				<>
					<div>
						<button onClick={addNote} className="add-btn">
							<NewNoteIcon />
						</button>
					</div>
					<div>
						<NotesList
							notes={notes}
							setNotes={setNotes}
							maxZIndex={maxZIndex}
							setMaxZIndex={setMaxZIndex}
						/>
					</div>
				</>
			)}

			{!signedInUser && (
				<button onClick={googleSignIn} className="sign-in-btn">
					Sign in with Google
				</button>
			)}
		</>
	);
}

export default App;
