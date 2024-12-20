import AddNote from './AddNote';
import NoteList from './NoteList';
import { NotesProvider } from './NotesContext';

export default function NoteApp() {
  return (
    <NotesProvider>
      <h1>Notes</h1>
      <div id="note-list">
        <AddNote />
        <NoteList />
      </div>
    </NotesProvider>
  );
}
