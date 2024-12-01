import { useState } from 'react';
import { useNotes, useNotesDispatch } from './NotesContext';

export default function NoteList() {
  const notes = useNotes()!;

  return (
    <ul>
      {notes.map((note:{id:number, text:string}) => (
        <li key={note.id}>
          <Note {...note} />
        </li>
      ))}
    </ul>
  );
}

function Note(note:{id:number, text:string}) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useNotesDispatch()!;
  let noteContent;
  const deleteButton = 
    <button onClick={() => {
      setIsEditing(false);
      dispatch({
        type: 'deleted',
        id: note.id
      });
    }}>
      &#128465;
    </button>

  if (isEditing) {
    noteContent = (
      <>
        <div className="input-box">
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
              setTimeout(() => setIsEditing(false), 3000)
            }}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  setIsEditing(false);
                }
              }
            }
            />
          {deleteButton}
        </div>
      </>
    );
  } else {
    noteContent = (
      <>
        {note.text}
        <button onClick={() => setIsEditing(true)}>
          &#9997;
        </button>
        {deleteButton}
      </>
    );
  }
  return (
    <label>
      {noteContent}
    </label>
  );
}
