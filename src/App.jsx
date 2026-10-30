import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useJobs } from './hooks/useJobs'
import JobTable from './components/JobTable'
import JobModal from './components/JobModal'
import Dashboard from './components/Dashboard'
import './App.css'

export default function App() {
  const { jobs, loading, error, addJob, updateJob, deleteJob } = useJobs()
  const [modal, setModal] = useState(null) // null | 'add' | job object

  function openAdd() { setModal('add') }
  function openEdit(job) { setModal(job) }
  function closeModal() { setModal(null) }

  async function handleSave(form) {
    if (modal === 'add') {
      await addJob(form)
    } else {
      await updateJob(modal.id, form)
    }
  }

  async function handleDelete(id) {
    if (confirm('Delete this application?')) await deleteJob(id)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Job Tracker</h1>
        <button className="btn-primary" onClick={openAdd}>
          <Plus size={16} /> Add Application
        </button>
      </header>

      {error && <div className="error-banner">{error}</div>}

      <Dashboard jobs={jobs} />

      {loading ? (
        <p className="loading">Loading…</p>
      ) : (
        <JobTable jobs={jobs} onEdit={openEdit} onDelete={handleDelete} />
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
