import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const STATUS_COLORS = {
  applied: '#3b82f6',
  phone_screen: '#f59e0b',
  interview: '#8b5cf6',
  offer: '#10b981',
  rejected: '#ef4444',
}

const STATUS_LABELS = {
  applied: 'Applied',
  phone_screen: 'Phone Screen',
  interview: 'Interview',
  offer: 'Offer',
  rejected: 'Rejected',
}

export default function PipelineChart({ jobs }) {
  if (jobs.length === 0) return null

  const data = Object.keys(STATUS_LABELS).map(status => ({
    name: STATUS_LABELS[status],
    count: jobs.filter(j => j.status === status).length,
    color: STATUS_COLORS[status],
  })).filter(d => d.count > 0)

  return (
    <div className="pipeline-chart">
      <h2 className="chart-title">Pipeline Breakdown</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 4, right: 16, left: -20, bottom: 0 }}>
          <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis allowDecimals={false} tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip
            cursor={{ fill: 'rgba(255,255,255,0.04)' }}
            contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, color: '#e2e8f0' }}
            labelStyle={{ color: '#94a3b8' }}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
