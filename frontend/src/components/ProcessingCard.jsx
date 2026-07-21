import Spinner from './Spinner.jsx'
import './ProcessingCard.css'

function ProcessingCard({ heading, description, children }) {
  return (
    <div className="processing-card">
      <div className="processing-card-header">
        <div>
          <p className="eyebrow processing-card-eyebrow">
            <span className="processing-card-dot" aria-hidden="true" />
            AI Processing
          </p>
          <h1 className="processing-card-heading">{heading}</h1>
          <p className="processing-card-description">{description}</p>
        </div>
        <Spinner size="md" />
      </div>

      {children}
    </div>
  )
}

export default ProcessingCard
