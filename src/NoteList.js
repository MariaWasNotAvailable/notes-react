import { useState } from 'react';
import { useNotes, useNotesDispatch } from './NotesContext.js';

export default function NoteList() {
  const notes = useNotes();
  return (
    <ul>
      {notes.map(note => (
        <li key={note.id}>
          <Note note={note} />
        </li>
      ))}
    </ul>
  );
}

function Note({ note }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useNotesDispatch();
  let noteContent;
  if (isEditing) {
    noteContent = (
      <>
        <input
          value={note.text}
          onChange={e => {
            dispatch({
              type: 'changed',
              note: {
                ...note,
                text: e.target.value
              }
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          &#128190;
        </button>
      </>
    );
  } else {
    noteContent = (
      <>
        {note.text}
        <button onClick={() => setIsEditing(true)}>
          &#9997;
        </button>
      </>
    );
  }
  return (
    <label>
      {noteContent}
      <button onClick={() => {
        dispatch({
          type: 'deleted',
          id: note.id
        });
      }}>
        &#128465;
      </button>
    </label>
  );
}
