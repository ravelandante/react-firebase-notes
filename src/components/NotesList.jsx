import { useState, useRef } from "react";
import "../App.css";
import Note from "./Note";
import { deleteNote, updateNote } from "../firebaseFunctions";

function NotesList({ notes, setNotes }) {
	const [maxZIndex, setMaxZIndex] = useState(1);
	const updateTimeoutRef = useRef(null);

	const deleteNoteFromLocalAndStore = async (id) => {
		await deleteNote(id);
		clearTimeout(updateTimeoutRef.current);
		setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
	};

	const debounceNoteUpdate = (id, title, content, x, y, updateTimeoutRef) => {
		// clear the previous timeout on note change (title or content edit, drag)
		if (updateTimeoutRef.current) {
			clearTimeout(updateTimeoutRef.current);
		}

		// set a new timeout
		updateTimeoutRef.current = setTimeout(async () => {
			updateNote(id, title, content, x, y);
		}, 1000);
	};

	const updateNoteInLocalAndStore = (updateTimeoutRef) => {
		return ({ id, title, content, x, y }) => {
			setNotes((prevNotes) =>
				prevNotes.map((note) => {
					if (note.id === id) {
						// if any of the values are null, use the previous value
						title ??= note.title;
						content ??= note.content;
						x ??= note.x;
						y ??= note.y;

						debounceNoteUpdate(id, title, content, x, y, updateTimeoutRef);
						return { id, title, content, x, y };
					}
					return note;
				})
			);
		};
	};

	return (
		<div className="notes-list">
			{notes.map((note) => (
				<Note
					key={note.id}
					id={note.id}
					title={note.title}
					content={note.content}
					position={{ x: note.x, y: note.y }}
					maxZIndex={maxZIndex}
					setMaxZIndex={setMaxZIndex}
					deleteNote={deleteNoteFromLocalAndStore}
					updateNote={updateNoteInLocalAndStore}
				/>
			))}
		</div>
	);
}

export default NotesList;
