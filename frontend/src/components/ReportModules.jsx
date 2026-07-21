import './ReportModules.css'

const MODULES = [
  {
    number: '01',
    title: 'Resume Parsing',
    description: 'Readable profile structure',
  },
  {
    number: '02',
    title: 'Skill Extraction',
    description: 'Competencies surfaced',
  },
  {
    number: '03',
    title: 'AI Matching',
    description: 'Role fit compared',
  },
  {
    number: '04',
    title: 'Career Recommendations',
    description: 'Next steps outlined',
  },
  {
    number: '05',
    title: 'PDF Report',
    description: 'Results ready to share',
  },
]

function ReportModules() {
  return (
    <section className="report-section" id="features">
      <div className="container">
        <div className="report-header">
          <div>
            <p className="eyebrow">Inside your report</p>
            <h2 className="report-title">A clearer view of your next move.</h2>
          </div>
          <p className="report-hint">05 Report Modules</p>
        </div>

        <div className="report-grid">
          {MODULES.map((module) => (
            <div className="report-card" key={module.number}>
              <div className="report-card-top">
                <span className="report-card-number">{module.number}</span>
                <span className="report-card-marker" aria-hidden="true" />
              </div>
              <h3 className="report-card-title">{module.title}</h3>
              <p className="report-card-description">{module.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ReportModules
