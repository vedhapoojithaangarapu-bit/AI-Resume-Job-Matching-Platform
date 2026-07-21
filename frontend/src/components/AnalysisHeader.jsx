import './AnalysisHeader.css'

function AnalysisHeader({ breadcrumb, session }) {
  return (
    <div className="container analysis-header">
      <p className="analysis-breadcrumb">{breadcrumb}</p>
      <p className="analysis-session">{session}</p>
    </div>
  )
}

export default AnalysisHeader
