import { useState, type Dispatch } from 'react';
import { useNotesDispatch } from './NotesContext';

export default function AddNote() {
  const [text, setText] = useState('');
  const dispatch:Dispatch<{ type:string; id:number; text:string; }> = useNotesDispatch()!;

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