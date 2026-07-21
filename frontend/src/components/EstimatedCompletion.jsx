import './EstimatedCompletion.css'

function EstimatedCompletion({ estimate }) {
  return (
    <div className="estimated-completion">
      <p className="eyebrow">Estimated completion</p>
      <p className="estimated-completion-value">{estimate}</p>
    </div>
  )
}

export default EstimatedCompletion
