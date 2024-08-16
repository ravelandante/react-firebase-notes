import { useState } from "react";
import { useRef } from "react";

import "../App.css";
import Draggable from "react-draggable";

import { BsPencilFill } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";

function Note({ title, content, id, maxZIndex, setMaxZIndex, removeNote, setNoteTitle, setNoteContent }) {
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
				<NoteTitle title={title} setNoteTitle={setNoteTitle} id={id} />
				<NoteContent
					content={content}
					readOnly={readOnly}
					setReadOnly={setReadOnly}
					id={id}
					removeNote={removeNote}
					setNoteContent={setNoteContent}
				/>
			</div>
		</Draggable>
	);
}

function NoteTitle({ title, setNoteTitle, id }) {
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
			onChange={(e) => setNoteTitle(id, e.target.value)}
			maxLength={42}
			onBlur={handleBlur}
			ref={inputRef}
		></input>
	);
}

function NoteContent({ content, readOnly, setReadOnly, id, removeNote, setNoteContent }) {
	return (
		<>
			<textarea
				className={`note-content ${readOnly ? "" : "note-content-editable"}`}
				readOnly={readOnly}
				value={content}
				onChange={(e) => setNoteContent(id, e.target.value)}
			></textarea>
			<button className="edit-btn" onClick={() => setReadOnly((prevReadOnly) => !prevReadOnly)}>
				<BsPencilFill />
			</button>
			<button className="del-btn" onClick={() => removeNote(id)}>
				<BsFillTrashFill />
			</button>
		</>
	);
}

export default Note;
