import { useState, useRef } from "react";
import "../App.css";
import Note from "./Note";
import { deleteNote, updateNote } from "../firebaseFunctions";

function NotesList({ notes, setNotes }) {
	const [maxZIndex, setMaxZIndex] = useState(1);
	const updateTimeoutRef = useRef(null);

	const debounceNoteUpdate = (id, newTitle, newContent) => {
		// clear the previous timeout on user type
		if (updateTimeoutRef.current) {
			clearTimeout(updateTimeoutRef.current);
		}

		// set a new timeout
		updateTimeoutRef.current = setTimeout(async () => {
			await updateNote(id, newTitle, newContent);
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
					debounceNoteUpdate(id, newTitle, note.content);
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
					debounceNoteUpdate(id, note.title, newContent);
					return { ...note, content: newContent };
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
					maxZIndex={maxZIndex}
					setMaxZIndex={setMaxZIndex}
					deleteNote={deleteNoteFromLocalAndStore}
					setNoteTitle={setNoteTitle}
					setNoteContent={setNoteContent}
				/>
			))}
		</div>
	);
}

export default NotesList;
