import { useState } from "react";
import { useRef } from "react";

import "../App.css";
import Draggable from "react-draggable";
import { BsPencilFill } from "react-icons/bs";

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

export default Note;
