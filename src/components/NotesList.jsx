import { useState } from "react";
import "../App.css";
import Note from "./Note";

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

export default NotesList;
