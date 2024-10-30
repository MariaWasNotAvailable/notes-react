import { useState } from 'react';
import { useNotesDispatch } from './NotesContext.js';

export default function AddNote() {
  const [text, setText] = useState('');
  const dispatch = useNotesDispatch();

  return (
    <>
      <input
        placeholder="Add note"
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={(e) => {
          if (text && e.key === 'Enter') {
            setText('');
            dispatch({
              type: 'added',
              id: nextId++,
              text: text,
            }); 
          }
        }}
      />
      <button onClick={() => {
        if (text) {
        setText('');
          dispatch({
            type: 'added',
            id: nextId++,
            text: text,
          }); 
        }
      }}>&#10133;</button>
    </>
  );
}

let nextId = 1;