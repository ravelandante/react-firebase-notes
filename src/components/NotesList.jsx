import { useState } from "react";
import "../App.css";
import Note from "./Note";
import { deleteNote } from "../firebaseFunctions";

function NotesList({ notes, setNotes }) {
	const [maxZIndex, setMaxZIndex] = useState(1);

	const deleteNoteFromLocalAndStore = async (id) => {
		await deleteNote(id);
		setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
	};

	const setNoteTitle = (id, newTitle) => {
		setNotes((prevNotes) =>
			prevNotes.map((note) => {
				if (note.id === id) {
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
