import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useJobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchJobs()
  }, [])

  async function fetchJobs() {
    setLoading(true)
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) setError(error.message)
    else setJobs(data)
    setLoading(false)
  }

  async function addJob(job) {
    const { data, error } = await supabase.from('jobs').insert([job]).select().single()
    if (error) throw error
    setJobs(prev => [data, ...prev])
    return data
  }

  async function updateJob(id, updates) {
    const { data, error } = await supabase.from('jobs').update(updates).eq('id', id).select().single()
    if (error) throw error
    setJobs(prev => prev.map(j => j.id === id ? data : j))
    return data
  }

  async function deleteJob(id) {
    const { error } = await supabase.from('jobs').delete().eq('id', id)
    if (error) throw error
    setJobs(prev => prev.filter(j => j.id !== id))
  }

  return { jobs, loading, error, addJob, updateJob, deleteJob, refetch: fetchJobs }
}
