import { useState, useRef } from "react";
import "../App.css";
import Note from "./Note";
import { deleteNote, updateNote } from "../firebaseFunctions";

function NotesList({ notes, setNotes }) {
	const [maxZIndex, setMaxZIndex] = useState(1);
	const updateTimeoutRef = useRef(null);

	const debounceNoteUpdate = (id, newTitle, newContent, x, y) => {
		// clear the previous timeout on user type
		if (updateTimeoutRef.current) {
			clearTimeout(updateTimeoutRef.current);
		}

		// set a new timeout
		updateTimeoutRef.current = setTimeout(async () => {
			await updateNote(id, newTitle, newContent, x, y);
		}, 1000);
	};

	const deleteNoteFromLocalAndStore = async (id) => {
		await deleteNote(id);
		setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
	};

	const setNoteTitle = (id, newTitle) => {
		setNotes((prevNotes) =>
			prevNotes.map((note) => {
				if (note.id === id) {
					debounceNoteUpdate(id, newTitle, note.content, note.x, note.y);
					return { ...note, title: newTitle };
				}
				return note;
			})
		);
	};

	const setNoteContent = (id, newContent) => {
		setNotes((prevNotes) =>
			prevNotes.map((note) => {
				if (note.id === id) {
					debounceNoteUpdate(id, note.title, newContent, note.x, note.y);
					return { ...note, content: newContent };
				}
				return note;
			})
		);
	};

	const setNotePosition = (id, x, y) => {
		setNotes((prevNotes) =>
			prevNotes.map((note) => {
				if (note.id === id) {
					debounceNoteUpdate(id, note.title, note.content, x, y);
					return { ...note, x: x, y: y };
				}
				return note;
			})
		);
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
					setNoteTitle={setNoteTitle}
					setNoteContent={setNoteContent}
					setNotePosition={setNotePosition}
				/>
			))}
		</div>
	);
}

export default NotesList;
