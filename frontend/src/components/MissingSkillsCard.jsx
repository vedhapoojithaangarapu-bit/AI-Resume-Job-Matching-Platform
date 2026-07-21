// MissingSkillsCard
//
// Expected props:
//   missingSkills   array of strings, e.g. ["Kubernetes", "SQL", "Figma"]

function MissingSkillsCard({ missingSkills = [] }) {
  return (
    <div className="result-card missing-skills-card">
      <div className="result-card-top">
        <p className="eyebrow">Skill gaps</p>
        <span className="result-card-marker" aria-hidden="true" />
      </div>
      <h2 className="result-card-title">Missing skills</h2>

      {missingSkills.length === 0 ? (
        <p className="missing-skills-empty">
          No critical skill gaps were detected for this role.
        </p>
      ) : (
        <ul className="missing-skills-list">
          {missingSkills.map((skill) => (
            <li className="missing-skill-chip" key={skill}>
              {skill}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MissingSkillsCard
