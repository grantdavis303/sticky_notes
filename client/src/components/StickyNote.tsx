import { useState } from 'react'
import { PencilSquareIcon, TrashIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
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
  // const [dropdownStatus, setDropdownStatus] = useState('closed');

  function formatDate(date: string) {
    const dateObj = new Date(date);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return `${days[dateObj.getDay()]}, ${months[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
  }

  const handleEllipsisClick = () => {
    setShowIcons(prev => !prev);

    // if (dropdownStatus === 'closed') {
    //   setDropdownStatus('open');
    // } else {
    //   setDropdownStatus('closed');
    // }
  }

  return (
    <div className="StickyNote" style={{ backgroundColor: color }}>
      <div style={{ margin: 'unset', marginLeft: 'auto', padding: 'unset', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <h3 style={{ marginTop: 'unset'}}>{title}</h3>

        <div style={{ margin: 'unset', padding: 'unset', display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
          <EllipsisHorizontalIcon className="Icon Update" onClick={handleEllipsisClick} />


        </div>
      </div>

      <p style={{ whiteSpace: 'pre-wrap' }}>{content}</p>
      <p className='mini'> Created {formatDate(created_at)} </p>

        {/* { showIcons && ( */}
          <div className={`IconDropdownContainer ${showIcons ? 'open' : 'closed'}`}>
            <PencilSquareIcon className="Icon Update" onClick={() => onUpdate(id)} />
            <TrashIcon className="Icon Delete" onClick={() => onDelete(id)} />
          </div>
        {/* )} */}

      {/* <p className='small'> Updated {formatDate(updated_at)} </p> */}
      {/* <button style={{ padding: '0.4rem', backgroundColor: 'red' }} onClick={() => onDelete(id)}> Delete </button>
      <button style={{ padding: '0.4rem', backgroundColor: 'blue' }} onClick={() => onUpdate(id)}> Update </button> */}
    </div>
  )
}

export default StickyNote;
