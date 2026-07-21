// JobRolesCard
//
// Expected props:
//   roles   array of {
//             title: string,
//             matchPercentage: number,       // 0-100
//             fitLabel: string,               // optional, e.g. "Best fit"
//                                              // (auto-computed from
//                                              // matchPercentage if omitted)
//             requiredSkills: string[],       // optional
//             salary: string,                 // optional placeholder text
//             location: string,               // optional placeholder text
//           }

function getFitLabel(percentage) {
  if (percentage >= 75) return 'Best fit'
  if (percentage >= 65) return 'Strong match'
  if (percentage >= 55) return 'Adjacent fit'
  return 'Developing fit'
}

function JobRoleTile({ role }) {
  const {
    title,
    matchPercentage = 0,
    fitLabel,
    requiredSkills = [],
    salary,
    location,
  } = role

  return (
    <div className="job-role-tile">
      <div className="job-role-tile-top">
        <h3 className="job-role-title">{title}</h3>
        <span className="job-role-percent">{matchPercentage}%</span>
      </div>
      <p className="job-role-fit">{fitLabel ?? getFitLabel(matchPercentage)}</p>

      {requiredSkills.length > 0 && (
        <ul className="job-role-skills">
          {requiredSkills.map((skill) => (
            <li className="job-role-skill-chip" key={skill}>
              {skill}
            </li>
          ))}
        </ul>
      )}

      {(salary || location) && (
        <div className="job-role-meta">
          {salary && <span className="job-role-meta-item">{salary}</span>}
          {salary && location && <span className="job-role-meta-dot" aria-hidden="true" />}
          {location && <span className="job-role-meta-item">{location}</span>}
        </div>
      )}
    </div>
  )
}

function JobRolesCard({ roles = [] }) {
  return (
    <div className="result-card job-roles-card">
      <div className="result-card-top">
        <p className="eyebrow">Where to focus</p>
        <span className="result-card-marker" aria-hidden="true" />
      </div>
      <h2 className="result-card-title">Recommended job roles</h2>

      {roles.length === 0 ? (
        <p className="job-roles-empty">
          Recommended roles will appear here once analysis data is available.
        </p>
      ) : (
        <div className="job-roles-grid">
          {roles.map((role) => (
            <JobRoleTile role={role} key={role.title} />
          ))}
        </div>
      )}
    </div>
  )
}

export default JobRolesCard
