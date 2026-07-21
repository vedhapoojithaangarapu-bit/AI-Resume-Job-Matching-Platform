import './LiveStatus.css'

function LiveStatus({ percent }) {
  return (
    <div className="live-status">
      <p className="eyebrow">Live status</p>
      <p className="live-status-percent">{percent}%</p>
      <p className="live-status-caption">Analysis sequence complete</p>
      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}

export default LiveStatus
