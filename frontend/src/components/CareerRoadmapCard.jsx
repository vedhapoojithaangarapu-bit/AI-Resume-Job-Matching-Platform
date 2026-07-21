// CareerRoadmapCard
//
// Expected props:
//   steps   array of {
//             title: string,
//             description: string,
//           }
//           (numbering is auto-generated from array position)

function CareerRoadmapCard({ steps = [] }) {
  return (
    <div className="result-card roadmap-card">
      <div className="result-card-top">
        <p className="eyebrow">Next 90 days</p>
        <span className="result-card-marker" aria-hidden="true" />
      </div>
      <h2 className="result-card-title">Personalized career roadmap</h2>

      {steps.length === 0 ? (
        <p className="roadmap-empty">
          Your personalized roadmap will appear here once analysis data is
          available.
        </p>
      ) : (
        <div className="roadmap-grid">
          {steps.map((step, index) => (
            <div className="roadmap-step" key={step.title}>
              <span className="roadmap-step-index">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="roadmap-step-title">{step.title}</h3>
              <p className="roadmap-step-description">{step.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CareerRoadmapCard
