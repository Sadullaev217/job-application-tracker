import { useState } from 'react'
import NotesTimeline from './NotesTimeline'

const STATUSES = ['applied', 'phone_screen', 'interview', 'offer', 'rejected']
const STATUS_LABELS = {
  applied: 'Applied',
  phone_screen: 'Phone Screen',
  interview: 'Interview',
  offer: 'Offer',
  rejected: 'Rejected',
}

const empty = { company: '', role: '', url: '', status: 'applied', applied_at: new Date().toISOString().split('T')[0], notes: '' }

export default function JobModal({ job, onSave, onClose }) {
  const [form, setForm] = useState(job ?? empty)
  const [saving, setSaving] = useState(false)

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    try {
      await onSave(form)
      onClose()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>{job ? 'Edit Application' : 'Add Application'}</h2>
        <form onSubmit={handleSubmit}>
          <label>Company *
            <input required value={form.company} onChange={e => set('company', e.target.value)} />
          </label>
          <label>Role *
            <input required value={form.role} onChange={e => set('role', e.target.value)} />
          </label>
          <label>Job URL
            <input type="url" value={form.url} onChange={e => set('url', e.target.value)} />
          </label>
          <label>Status
            <select value={form.status} onChange={e => set('status', e.target.value)}>
              {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
            </select>
          </label>
          <label>Date Applied
            <input type="date" value={form.applied_at} onChange={e => set('applied_at', e.target.value)} />
          </label>
          <label>Notes
            <textarea value={form.notes} onChange={e => set('notes', e.target.value)} rows={3} />
          </label>
          {job && <NotesTimeline jobId={job.id} />}
          <div className="modal-actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
