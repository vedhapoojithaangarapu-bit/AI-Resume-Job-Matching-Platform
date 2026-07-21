// ExperienceAnalysisCard
//
// Expected props:
//   items   array of {
//             type: 'strength' | 'opportunity',
//             title: string,
//             description: string,
//           }

function ExperienceAnalysisCard({ items = [] }) {
  return (
    <div className="result-card experience-card">
      <div className="result-card-top">
        <p className="eyebrow">Career evidence</p>
        <span className="result-card-marker" aria-hidden="true" />
      </div>
      <h2 className="result-card-title">Experience analysis</h2>

      {items.length === 0 ? (
        <p className="experience-empty">
          Experience insights will appear here once analysis data is
          available.
        </p>
      ) : (
        <ul className="experience-list">
          {items.map((item) => (
            <li className="experience-item" key={item.title}>
              <span
                className={`experience-marker experience-marker-${item.type}`}
                aria-hidden="true"
              >
                {item.type === 'strength' ? '\u2713' : '+'}
              </span>
              <span className="experience-item-body">
                <span className="experience-item-title">{item.title}</span>
                <span className="experience-item-description">
                  {item.description}
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ExperienceAnalysisCard
