import { useState } from "react";
import { useRef } from "react";

import "./App.css";
function App() {
	return (
		<>
			<div>
			</div>

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
		</>
	);
}

export default App;
