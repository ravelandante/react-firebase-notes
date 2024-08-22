import { useState } from "react";
import { useRef } from "react";

import "../App.css";
import Draggable from "react-draggable";

import { DeleteIcon, EditIcon, TickIcon } from "./Icons";

function Note({ title, content, id, position, zIndex, maxZIndex, setMaxZIndex, deleteNote, updateNote }) {
	const [shouldAnimate, setShouldAnimate] = useState(false);
	const [readOnly, setReadOnly] = useState(true);

	const updateTimeoutRef = useRef(null);
	const updateNoteWithDebounce = updateNote(updateTimeoutRef);

	const onStart = () => {
		if (zIndex !== maxZIndex) {
			const newZIndex = maxZIndex + 1;
			updateNoteWithDebounce({ id: id, zIndex: newZIndex });
			setMaxZIndex(newZIndex);
		}
		setShouldAnimate(true);
	};

	const onStop = (event, data) => {
		setShouldAnimate(false);
		updateNoteWithDebounce({ id: id, x: data.x, y: data.y });
	};

	const nodeRef = useRef(null);
	return (
		<Draggable
			cancel={`input, button${readOnly ? "" : ", textarea"}`}
			//bounds="body"
			onStop={onStop}
			onStart={onStart}
			nodeRef={nodeRef}
			defaultPosition={position}
		>
			<div
				className={["note", shouldAnimate ? "animate-note" : ""]}
				style={{ zIndex: zIndex }}
				ref={nodeRef}
			>
				<NoteTitle title={title} id={id} updateNoteWithDebounce={updateNoteWithDebounce} />
				<NoteContent
					content={content}
					readOnly={readOnly}
					setReadOnly={setReadOnly}
					id={id}
					deleteNote={deleteNote}
					updateNoteWithDebounce={updateNoteWithDebounce}
				/>
			</div>
		</Draggable>
	);
}

function NoteTitle({ title, id, updateNoteWithDebounce }) {
	const inputRef = useRef(null);

	const handleBlur = () => {
		if (inputRef.current) {
			inputRef.current.setSelectionRange(0, 0);
		}
	};

	return (
		<input
			className="title-input"
			value={title}
			onChange={(e) => updateNoteWithDebounce({ id: id, title: e.target.value })}
			maxLength={42}
			onBlur={handleBlur}
			ref={inputRef}
		></input>
	);
}

function NoteContent({ content, readOnly, setReadOnly, id, deleteNote, updateNoteWithDebounce }) {
	return (
		<>
			<textarea
				className={`note-content ${readOnly ? "" : "note-content-editable"}`}
				readOnly={readOnly}
				value={content}
				onChange={(e) => updateNoteWithDebounce({ id: id, content: e.target.value })}
				ref={contentRef}
			></textarea>
			<button className="edit-btn" onClick={() => setReadOnly((prevReadOnly) => !prevReadOnly)}>
				{readOnly ? <EditIcon /> : <TickIcon />}
			</button>
			<button className="del-btn" onClick={() => deleteNote(id)}>
				<DeleteIcon />
			</button>
		</>
	);
}

export default Note;
