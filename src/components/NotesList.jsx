import { useState } from "react";
import "../App.css";
import Note from "./Note";
import { removeDoc } from "../firebaseFunctions";

function NotesList({ notes, setNotes }) {
	const [maxZIndex, setMaxZIndex] = useState(1);

	const removeNote = async (id) => {
		await removeDoc(id);
		setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
	};

	return (
		<div className="notes-list">
			{notes.map((note) => (
				<Note
					key={note.id}
					id={note.id}
					title={note.title}
					maxZIndex={maxZIndex}
					setMaxZIndex={setMaxZIndex}
					removeNote={removeNote}
				/>
			))}
		</div>
	);
}

export default NotesList;
