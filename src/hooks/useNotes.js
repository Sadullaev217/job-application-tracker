import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useNotes(jobId) {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(false)

  async function fetchNotes() {
    if (!jobId) return
    setLoading(true)
    const { data } = await supabase
      .from('job_notes')
      .select('*')
      .eq('job_id', jobId)
      .order('created_at', { ascending: false })
    setNotes(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchNotes() }, [jobId])

  async function addNote(body) {
    const { data } = await supabase
      .from('job_notes')
      .insert({ job_id: jobId, body })
      .select()
      .single()
    if (data) setNotes(prev => [data, ...prev])
  }

  async function deleteNote(id) {
    await supabase.from('job_notes').delete().eq('id', id)
    setNotes(prev => prev.filter(n => n.id !== id))
  }

  return { notes, loading, addNote, deleteNote }
}
