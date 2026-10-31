import { useState } from 'react'
import { Plus, LayoutList, Columns } from 'lucide-react'
import { useJobs } from './hooks/useJobs'
import JobTable from './components/JobTable'
import JobModal from './components/JobModal'
import Dashboard from './components/Dashboard'
import KanbanBoard from './components/KanbanBoard'
import './App.css'

export default function App() {
  const { jobs, loading, error, addJob, updateJob, deleteJob } = useJobs()
  const [modal, setModal] = useState(null)
  const [view, setView] = useState('table') // 'table' | 'kanban'

  function openAdd() { setModal('add') }
  function openEdit(job) { setModal(job) }
  function closeModal() { setModal(null) }

  async function handleSave(form) {
    if (modal === 'add') await addJob(form)
    else await updateJob(modal.id, form)
  }

  async function handleDelete(id) {
    if (confirm('Delete this application?')) await deleteJob(id)
  }

  async function handleUpdateStatus(id, status) {
    await updateJob(id, { status })
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Job Tracker</h1>
        <div className="header-actions">
          <div className="view-toggle">
            <button
              className={view === 'table' ? 'active' : ''}
              onClick={() => setView('table')}
              title="Table view"
            ><LayoutList size={16} /></button>
            <button
              className={view === 'kanban' ? 'active' : ''}
              onClick={() => setView('kanban')}
              title="Kanban view"
            ><Columns size={16} /></button>
          </div>
          <button className="btn-primary" onClick={openAdd}>
            <Plus size={16} /> Add Application
          </button>
        </div>
      </header>

      {error && <div className="error-banner">{error}</div>}

      <Dashboard jobs={jobs} />

      {loading ? (
        <p className="loading">Loading…</p>
      ) : view === 'table' ? (
        <JobTable jobs={jobs} onEdit={openEdit} onDelete={handleDelete} />
      ) : (
        <KanbanBoard jobs={jobs} onEdit={openEdit} onUpdateStatus={handleUpdateStatus} />
      )}

      {modal && (
        <JobModal
          job={modal === 'add' ? null : modal}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
    </div>
  )
}
