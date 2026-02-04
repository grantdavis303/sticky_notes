import { useState } from 'react'
import './StickyNoteModal.css'

interface Props {
  setIsUpdateModalOpen: (value: boolean) => void;
  setStickyNotes: (value: any[]) => void;
  updatedNote: any;
}

function UpdateStickyNoteModal({ setIsUpdateModalOpen, setStickyNotes, updatedNote }: Props) {
  const [title, setTitle] = useState(updatedNote.title);
  const [content, setContent] = useState(updatedNote.content);

  const handleTitleChange = (e: any) => setTitle(e.target.value);
  const handleContentChange = (e: any) => setContent(e.target.value);
  const handleSubmit = (event: any) => {
    event.preventDefault();

    // Gets the name attribute, not ID
    const formData = new FormData(event.target);
    const title = formData.get('title');
    const content = formData.get('content');
    const color = formData.get('color');

    const newNote = {
      title: title,
      content: content,
      color: color
    }

    handleFormSubmission(newNote);
    setIsUpdateModalOpen(false);
  }

  const handleFormSubmission = async (formData: any) => {
    try {
      console.log('New form data...', formData);

      const response = await fetch(`http://localhost:3000/api/v1/notes/update/${updatedNote.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`Fetching error: ${response.status}`);
      }

      const newlyUpdatedNote = await response.json();

      setStickyNotes(prev => prev.map(note => note.id === newlyUpdatedNote.rows[0].id ? newlyUpdatedNote.rows[0] : note));
    } catch (err) {
      console.log('An error occurred: ', err);
    }
  }

  return (
    <>
      <div className='modal' id='modal' role="dialog" aria-modal="true">
        <form onSubmit={handleSubmit}>
          <h1> Update {updatedNote.title} </h1>

          <div>
            <label htmlFor="title">Title</label>
            <input type="text" id='title' name="title" value={title} onChange={handleTitleChange} />
          </div>

          <div>
            <label htmlFor="content">Content</label>
            <textarea id="content" name="content" onChange={handleContentChange}>{content}</textarea>
          </div>

          <div>
            <select id='color' name='color'>
              <option value='#ffffb6'>Yellow</option>
              <option value='#c3ffb6'>Green</option>
              <option value='#b6fff8'>Blue</option>
              <option value='#eeb6ff'>Purple</option>
              <option value='#ffb6b6'>Red</option>
            </select>
          </div>

          <button type='submit'>Submit</button>
          <button type='button' onClick={() => setIsUpdateModalOpen(false)}>Close</button>
        </form>
      </div>

      <div className='modal-overlay'></div>
    </>
  )
}

export default UpdateStickyNoteModal;
