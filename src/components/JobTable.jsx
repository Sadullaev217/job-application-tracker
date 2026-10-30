import { useState } from 'react'
import { Pencil, Trash2, ExternalLink } from 'lucide-react'

const STATUSES = ['all', 'applied', 'phone_screen', 'interview', 'offer', 'rejected']
const STATUS_LABELS = {
  all: 'All',
  applied: 'Applied',
  phone_screen: 'Phone Screen',
  interview: 'Interview',
  offer: 'Offer',
  rejected: 'Rejected',
}
const STATUS_COLORS = {
  applied: '#3b82f6',
  phone_screen: '#f59e0b',
  interview: '#8b5cf6',
  offer: '#10b981',
  rejected: '#ef4444',
}

export default function JobTable({ jobs, onEdit, onDelete }) {
  const [filter, setFilter] = useState('all')

  const visible = filter === 'all' ? jobs : jobs.filter(j => j.status === filter)

  return (
    <div>
      <div className="filter-tabs">
        {STATUSES.map(s => (
          <button
            key={s}
            className={`filter-tab ${filter === s ? 'active' : ''}`}
            onClick={() => setFilter(s)}
          >
            {STATUS_LABELS[s]}
            <span className="count">
              {s === 'all' ? jobs.length : jobs.filter(j => j.status === s).length}
            </span>
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="empty">No applications yet.</p>
      ) : (
        <table className="job-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Status</th>
              <th>Applied</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visible.map(job => (
              <tr key={job.id}>
                <td>
                  <strong>{job.company}</strong>
                  {job.url && (
                    <a href={job.url} target="_blank" rel="noreferrer" className="ext-link">
                      <ExternalLink size={12} />
                    </a>
                  )}
                </td>
                <td>{job.role}</td>
                <td>
                  <span className="badge" style={{ background: STATUS_COLORS[job.status] }}>
                    {STATUS_LABELS[job.status]}
                  </span>
                </td>
                <td>{job.applied_at}</td>
                <td className="actions">
                  <button onClick={() => onEdit(job)} title="Edit"><Pencil size={14} /></button>
                  <button onClick={() => onDelete(job.id)} title="Delete" className="danger"><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
