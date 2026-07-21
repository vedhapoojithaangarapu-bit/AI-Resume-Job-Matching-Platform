import Spinner from './Spinner.jsx'
import './WorkflowList.css'

function statusForIndex(index, activeIndex) {
  if (index < activeIndex) return 'complete'
  if (index === activeIndex) return 'active'
  return 'pending'
}

function WorkflowList({ steps, activeIndex }) {
  return (
    <ol className="workflow-list">
      {steps.map((step, index) => {
        const status = statusForIndex(index, activeIndex)
        return (
          <li className="workflow-item" key={step}>
            <span className={`workflow-marker workflow-marker-${status}`}>
              {status === 'complete' && <span aria-hidden="true">&#10003;</span>}
              {status === 'active' && <Spinner size="sm" />}
              {status === 'pending' && <span className="workflow-marker-dot" aria-hidden="true" />}
            </span>
            <span className="workflow-label">{step}</span>
            <span className="workflow-status">
              {status === 'complete' && 'Complete'}
              {status === 'active' && 'In progress'}
            </span>
          </li>
        )
      })}
    </ol>
  )
}

export default WorkflowList
