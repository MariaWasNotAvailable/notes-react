import { createContext, useContext, useReducer, useEffect } from 'react';

const NotesContext = createContext(null);
const NotesDispatchContext = createContext(null);

export function NotesProvider({ children }) {
  const [notes, dispatch] = useReducer(
    notesReducer,
    initialNotes
  );

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);
  
  return (
    <NotesContext.Provider value={notes}>
      <NotesDispatchContext.Provider value={dispatch}>
        {children}
      </NotesDispatchContext.Provider>
    </NotesContext.Provider>
  );
}

export function useNotes() {
  return useContext(NotesContext);
}

export function useNotesDispatch() {
  return useContext(NotesDispatchContext);
}

function notesReducer(notes, action) {
  switch (action.type) {
    case 'added': {
      return [...notes, {
        id: action.id,
        text: action.text
      }];
    }
    case 'changed': {
      return notes.map(n => {
        if (n.id === action.note.id) {
          return action.note;
        } else {
          return n;
        }
      });
    }
    case 'deleted': {
      return notes.filter(n => n.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

let initialNotes = [
  { id: 0, text: 'Put your notes here...' }
];

if (localStorage.getItem('notes')) {
  initialNotes = JSON.parse(localStorage.getItem('notes'))
}