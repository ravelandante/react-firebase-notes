import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import { useState } from "react";

import "./App.css";
import NotesList from "./components/NotesList";
import { getSavedNotes, createNote } from "./firebaseFunctions";

function App() {
	const [notes, setNotes] = useState([]);
	const [signedInUser, setSignedInUser] = useState(null);

	const setSavedNotes = async (userId) => {
		const savedNotes = await getSavedNotes(userId);
		savedNotes.forEach((doc) => {
			setNotes((prevNotes) => [...prevNotes, { id: doc.id, ...doc.data() }]);
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
		const newDoc = await createNote(title, signedInUser.uid);
		setNotes([...notes, { id: newDoc.id, title: title }]);
	};

	return (
		<>
			{signedInUser && (
				<>
					<div>
						<button onClick={addNote}>Add new note</button>
					</div>
					<div>
						<NotesList notes={notes} setNotes={setNotes} />
					</div>
				</>
			)}

			{!signedInUser && <button onClick={googleSignIn}>Sign in with Google</button>}
		</>
	);
}

export default App;
