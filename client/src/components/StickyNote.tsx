import { useState } from 'react'
import { PencilSquareIcon, TrashIcon, EllipsisHorizontalIcon, XMarkIcon } from '@heroicons/react/24/outline'
import './StickyNote.css'

interface Props {
  id: number;
  title: string;
  content: string;
  color: string;
  created_at: string;
  updated_at: string;
  onDelete: (id: number) => void;
  onUpdate: (id: number) => void;
}

function StickyNote({ id, title, content, color, created_at, updated_at, onDelete, onUpdate }: Props) {
  const [showIcons, setShowIcons] = useState(false);

  function formatDate(date: string) {
    const dateObj = new Date(date);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return `${days[dateObj.getDay()]}, ${months[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()} at ${dateObj.toLocaleTimeString()}`;
  }

  const handleEllipsisClick = () => {
    setShowIcons(prev => !prev);
  }

  return (
    <div className="StickyNote" style={{ backgroundColor: color }}>
      <div style={{ margin: 'unset', marginLeft: 'auto', padding: 'unset', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <h3 style={{ marginTop: 'unset'}}>{title}</h3>

        <div style={{ margin: 'unset', padding: 'unset', display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>

        <EllipsisHorizontalIcon className={`Icon Overflow ${showIcons ? 'Closed' : 'Open'}`} onClick={handleEllipsisClick} />
        <XMarkIcon className={`Icon Close ${showIcons ? 'Open' : 'Closed'}`} onClick={handleEllipsisClick} />

        {/*
          <EllipsisHorizontalIcon className={`Icon ${showIcons ? 'Open' : 'Closed'}`} onClick={handleEllipsisClick} />
          <XMarkIcon className={`Icon ${showIcons ? 'Open' : 'Closed'}`} onClick={handleEllipsisClick} />
        */}
        </div>
      </div>

      <p style={{ whiteSpace: 'pre-wrap' }}>{content}</p>
      <p className='mini'> Created {formatDate(created_at)} </p>
      {/* <p className='mini'> Updated {formatDate(updated_at)} </p> */}

      <div className={`IconDropdownContainer ${showIcons ? 'open' : 'closed'}`}>
        <PencilSquareIcon className="Icon Update" onClick={() => onUpdate(id)} />
        <TrashIcon className="Icon Delete" onClick={() => onDelete(id)} />
      </div>
    </div>
  )
}

export default StickyNote;
