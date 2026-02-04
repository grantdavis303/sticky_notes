import './StickyNoteModal.css'

interface Props {
  setIsCreateModalOpen: (value: boolean) => void;
  setStickyNotes: (value: any[]) => void;
}

function CreateStickyNoteModal({ setIsCreateModalOpen, setStickyNotes }: Props) {
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
    setIsCreateModalOpen(false);
  }

  const handleFormSubmission = async (formData: any) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/notes/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`Fetching error: ${response.status}`);
      }

      const newNote = await response.json();

      setStickyNotes(prev => [...prev, newNote.rows[0]]);
    } catch (err) {
      console.log('An error occurred: ', err);
    }
  }

  return (
    <>
      <div className='modal' id='modal' role="dialog" aria-modal="true">
        <form onSubmit={handleSubmit}>
          <h1> Create Sticky Note </h1>

          <div>
            <label htmlFor="title">Title</label>
            <input type="text" id='title' name="title"/>
          </div>

          <div>
            <label htmlFor="content">Content</label>
            <textarea id="content" name="content"></textarea>
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
          <button type='button' onClick={() => setIsCreateModalOpen(false)}>Close</button>
        </form>
      </div>

      <div className='modal-overlay'></div>
    </>
  )
}

export default CreateStickyNoteModal;