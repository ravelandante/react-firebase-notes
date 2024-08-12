import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import { useState } from "react";
import { useRef } from "react";

import "./App.css";
import Draggable from "react-draggable";
import { BsPencilFill } from "react-icons/bs";

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

function NotesList({ notes }) {
	const [maxZIndex, setMaxZIndex] = useState(1);

	return (
		<div className="notes-list">
			{notes.map((note) => (
				<Note
					key={note.id}
					title={note.title}
					maxZIndex={maxZIndex}
					setMaxZIndex={setMaxZIndex}
				/>
			))}
		</div>
	);
}

function Note({ title, maxZIndex, setMaxZIndex }) {
	const [zIndex, setZIndex] = useState(0);
	const [shouldAnimate, setShouldAnimate] = useState(false);
	const [readOnly, setReadOnly] = useState(true);

	const onStart = () => {
		if (zIndex !== maxZIndex) {
			const newZIndex = maxZIndex + 1;
			setZIndex(newZIndex);
			setMaxZIndex(newZIndex);
		}
		setShouldAnimate(true);
	};

	const onStop = () => {
		setShouldAnimate(false);
	};

	const nodeRef = useRef(null);
	return (
		<Draggable
			cancel={["input", "button", readOnly ? "NULL" : "textarea"]}
			//bounds="body"
			onStop={onStop}
			onStart={onStart}
			nodeRef={nodeRef}
		>
			<div
				className={["note", shouldAnimate ? "animate" : ""]}
				style={{ zIndex: zIndex }}
				ref={nodeRef}
			>
				<NoteTitle title={title} />
				<NoteContent readOnly={readOnly} setReadOnly={setReadOnly} />
			</div>
		</Draggable>
	);
}

function NoteTitle({ title }) {
	const [noteTitle, setNoteTitle] = useState(title);
	const inputRef = useRef(null);

	const handleBlur = () => {
		if (inputRef.current) {
			inputRef.current.setSelectionRange(0, 0);
		}
	};

	return (
		<input
			className="title-input"
			value={noteTitle}
			onChange={(e) => setNoteTitle(e.target.value)}
			maxLength={42}
			onBlur={handleBlur}
			ref={inputRef}
		></input>
	);
}

function NoteContent({ readOnly, setReadOnly }) {
	return (
		<>
			<textarea
				className={`note-content ${readOnly ? "" : "note-content-editable"}`}
				readOnly={readOnly}
			></textarea>
			<button className="edit-btn" onClick={() => setReadOnly(!readOnly)}>
				<BsPencilFill />
			</button>
		</>
	);
}

export default App;
