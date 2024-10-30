import AddNote from './AddNote.js';
import NoteList from './NoteList.js';
import { NotesProvider } from './NotesContext.js';

export default function NoteApp() {
  return (
    <NotesProvider>
      <h1>Notes</h1>
      <AddNote />
      <NoteList />
    </NotesProvider>
  );
}
