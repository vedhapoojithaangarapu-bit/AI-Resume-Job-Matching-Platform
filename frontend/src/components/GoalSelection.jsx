import './GoalSelection.css'

const GOALS = [
  {
    id: 'job-match',
    title: 'Applying for a Job',
    description: 'Analyze resume compatibility with a target job.',
    tag: 'Job Match',
  },
  {
    id: 'career-map',
    title: 'Preparing for my Dream Career',
    description:
      'Discover missing skills, certifications, projects, and build a learning roadmap.',
    tag: 'Career Map',
  },
]

function GoalSelection({ selectedGoal, onSelectGoal }) {
  return (
    <section className="goal-section" id="step-01">
      <div className="container">
        <div className="goal-header">
          <div>
            <p className="eyebrow">Step 01</p>
            <h2 className="goal-title">What brings you here?</h2>
          </div>
          <p className="goal-hint">Select one goal</p>
        </div>

        <div className="goal-grid">
          {GOALS.map((goal, index) => {
            const isSelected = selectedGoal === goal.id
            return (
              <button
                type="button"
                key={goal.id}
                className={`goal-card${isSelected ? ' goal-card-selected' : ''}`}
                onClick={() => onSelectGoal(goal.id)}
                aria-pressed={isSelected}
              >
                <span className="goal-card-indicator" aria-hidden="true">
                  {isSelected ? '✓' : index + 1}
                </span>
                <span className="goal-card-body">
                  <span className="goal-card-title">{goal.title}</span>
                  <span className="goal-card-description">{goal.description}</span>
                </span>
                <span className="goal-card-tag">{goal.tag}</span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default GoalSelection
