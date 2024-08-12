import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

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

	const createNote = () => {
		const incrementedId = (notes.at(-1)?.id ?? 0) + 1;
		setNotes([...notes, { id: incrementedId, title: "New note" }]);
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
