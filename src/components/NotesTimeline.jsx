import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { useNotes } from '../hooks/useNotes'

function formatDate(iso) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit',
  })
}

export default function NotesTimeline({ jobId }) {
  const { notes, loading, addNote, deleteNote } = useNotes(jobId)
  const [text, setText] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!text.trim()) return
    await addNote(text.trim())
    setText('')
  }

  return (
    <div className="notes-timeline">
      <h3 className="notes-title">Notes</h3>

      <form className="note-form" onSubmit={handleSubmit}>
        <textarea
          className="note-input"
          rows={2}
          placeholder="Add a note…"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button className="btn-primary note-submit" type="submit" disabled={!text.trim()}>
          Add
        </button>
      </form>

      {loading ? (
        <p className="loading">Loading…</p>
      ) : notes.length === 0 ? (
        <p className="notes-empty">No notes yet.</p>
      ) : (
        <ul className="notes-list">
          {notes.map(note => (
            <li key={note.id} className="note-item">
              <div className="note-dot" />
              <div className="note-body">
                <p className="note-text">{note.body}</p>
                <span className="note-date">{formatDate(note.created_at)}</span>
              </div>
              <button
                className="note-delete"
                onClick={() => deleteNote(note.id)}
                title="Delete note"
              ><Trash2 size={14} /></button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
