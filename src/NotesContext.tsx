import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

const NotesContext = createContext<any>(null);
const NotesDispatchContext = createContext<any>(null);

type Props = {
  children?: ReactNode
};

export function NotesProvider({ children }:Props) {
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

function notesReducer(notes:{id:number}[], action:{id:number, note:{id:number}, type:string, text:string}) {
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
  initialNotes = JSON.parse(localStorage.getItem('notes')!)
}