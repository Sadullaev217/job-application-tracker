export default function Dashboard({ jobs }) {
  const total = jobs.length
  const active = jobs.filter(j => ['applied','phone_screen','interview'].includes(j.status)).length
  const offers = jobs.filter(j => j.status === 'offer').length
  const offerRate = total > 0 ? Math.round((offers / total) * 100) : 0

  const stats = [
    { label: 'Total Applied', value: total, color: '#3b82f6' },
    { label: 'Active Pipeline', value: active, color: '#8b5cf6' },
    { label: 'Offers', value: offers, color: '#10b981' },
    { label: 'Offer Rate', value: `${offerRate}%`, color: '#f59e0b' },
  ]

  return (
    <div className="dashboard">
      {stats.map(s => (
        <div key={s.label} className="stat-card" style={{ borderColor: s.color }}>
          <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  )
}
