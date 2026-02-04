import { useState, useEffect } from 'react';
import StickyNote from './components/StickyNote.tsx';
import CreateStickyNoteModal from './components/CreateStickyNoteModal.tsx';
import UpdateStickyNoteModal from './components/UpdateStickyNoteModal.tsx';
import './App.css';

function App() {
  const [stickyNotes, setStickyNotes] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updatedNote, setUpdatedNote] = useState({})

  // Fetch all of a user's notes on load
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/notes');

        if (!response.ok) {
          throw new Error(`Fetching error: ${response.status}`);
        }

        const json = await response.json();
        setStickyNotes(json);
      } catch (err) {
        console.log('An error occurred: ', err);
      }
    })()
  }, [])

  // Delete a note when clicking a button
  const handleDeleteButtonClick = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/notes/delete/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`Fetching error: ${response.status}`);
      }

      setStickyNotes(prev => prev.filter(stickyNote => stickyNote.id !== id))
    } catch (err) {
      console.log('An error occurred: ', err);
    }
  }

  // Update a note when clicking a button
  const handleUpdateButtonClick = async (id: number) => {
    try {
      // console.log('The ID of the note clicked is...', id);
      // const updatedNote = stickyNotes.filter(stickyNote => stickyNote.id === id);

      setUpdatedNote(stickyNotes.filter(stickyNote => stickyNote.id === id)[0]);
      setIsUpdateModalOpen(true);
    } catch (err) {
      console.log('An error occurred: ', err);
    }
  }

  return (
    <>
      <div id='outerContainer'>
        <div id='innerContainer'>
          <h1> Sticky Notes </h1>
          <p> Created by Grant Davis </p>

          <h2> My Notes ({stickyNotes.length}) </h2>

          <div>
            <button onClick={() => setIsCreateModalOpen(true)}>New Sticky Note</button>

            {isCreateModalOpen && (
              <CreateStickyNoteModal setIsCreateModalOpen={setIsCreateModalOpen} setStickyNotes={setStickyNotes} />
            )}
          </div>

          <div>
            {isUpdateModalOpen && (
              <UpdateStickyNoteModal setIsUpdateModalOpen={setIsUpdateModalOpen} setStickyNotes={setStickyNotes} updatedNote={updatedNote} />
            )}
          </div>

          <div id='stickyNotesContainer'>

            { stickyNotes.length === 0 &&
              <div style={{ marginLeft: 0, paddingLeft: 0 }}>
                <p> No notes found! Create one by clicking the button above. </p>
              </div>
            }

            { stickyNotes.map(note =>
              <StickyNote
                key={note.id}
                id={note.id}
                title={note.title}
                content={note.content}
                color={note.color}
                created_at={note.created_at}
                updated_at={note.updated_at}
                onDelete={handleDeleteButtonClick}
                onUpdate={handleUpdateButtonClick}
              />)
            }

          </div>
        </div>
      </div>
    </>
  )
}

export default App
