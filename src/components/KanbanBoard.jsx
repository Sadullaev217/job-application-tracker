import { useState } from 'react'

const COLUMNS = [
  { id: 'applied', label: 'Applied', color: '#3b82f6' },
  { id: 'phone_screen', label: 'Phone Screen', color: '#f59e0b' },
  { id: 'interview', label: 'Interview', color: '#8b5cf6' },
  { id: 'offer', label: 'Offer', color: '#10b981' },
  { id: 'rejected', label: 'Rejected', color: '#ef4444' },
]

function KanbanCard({ job, onEdit, onDragStart }) {
  return (
    <div
      className="kanban-card"
      draggable
      onDragStart={(e) => onDragStart(e, job)}
      onClick={() => onEdit(job)}
    >
      <div className="kanban-card-company">{job.company}</div>
      <div className="kanban-card-role">{job.role}</div>
      <div className="kanban-card-date">{job.applied_at}</div>
    </div>
  )
}

export default function KanbanBoard({ jobs, onEdit, onUpdateStatus }) {
  const [dragOver, setDragOver] = useState(null)

  function handleDragStart(e, job) {
    e.dataTransfer.setData('jobId', job.id)
  }

  function handleDragOver(e, colId) {
    e.preventDefault()
    setDragOver(colId)
  }

  function handleDrop(e, colId) {
    e.preventDefault()
    setDragOver(null)
    const jobId = e.dataTransfer.getData('jobId')
    const job = jobs.find(j => j.id === jobId)
    if (job && job.status !== colId) {
      onUpdateStatus(jobId, colId)
    }
  }

  return (
    <div className="kanban-board">
      {COLUMNS.map(col => {
        const colJobs = jobs.filter(j => j.status === col.id)
        return (
          <div
            key={col.id}
            className={`kanban-col ${dragOver === col.id ? 'drag-over' : ''}`}
            onDragOver={(e) => handleDragOver(e, col.id)}
            onDragLeave={() => setDragOver(null)}
            onDrop={(e) => handleDrop(e, col.id)}
          >
            <div className="kanban-col-header" style={{ borderColor: col.color }}>
              <span style={{ color: col.color }}>{col.label}</span>
              <span className="kanban-count">{colJobs.length}</span>
            </div>
            <div className="kanban-cards">
              {colJobs.map(job => (
                <KanbanCard
                  key={job.id}
                  job={job}
                  onEdit={onEdit}
                  onDragStart={handleDragStart}
                />
              ))}
              {colJobs.length === 0 && (
                <div className="kanban-empty">Drop here</div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
