// SkillMatchCard
//
// Expected props:
//   skills           array   [{ name: string, score: number 0-100 }, ...]
//   matchedCount      number  (auto-computed from `skills` if omitted:
//                              count of entries with score >= 60)
//   totalCount        number  (auto-computed as skills.length if omitted)
//   matchPercentage   number  (auto-computed as the average of skills[].score
//                              if omitted)

function computeMatchedCount(skills) {
  return skills.filter((skill) => (skill.score ?? 0) >= 60).length
}

function computeAverage(skills) {
  if (skills.length === 0) return 0
  const total = skills.reduce((sum, skill) => sum + (skill.score ?? 0), 0)
  return Math.round(total / skills.length)
}

function SkillMatchCard({ skills = [], matchedCount, totalCount, matchPercentage }) {
  const resolvedTotal = totalCount ?? skills.length
  const resolvedMatched = matchedCount ?? computeMatchedCount(skills)
  const resolvedPercentage = matchPercentage ?? computeAverage(skills)

  return (
    <div className="result-card skill-match-card">
      <div className="result-card-top">
        <p className="eyebrow">Skill alignment</p>
        <span className="result-card-marker" aria-hidden="true" />
      </div>
      <h2 className="result-card-title">Skill match overview</h2>

      <div className="skill-match-summary">
        <p className="skill-match-count">
          {resolvedMatched} of {resolvedTotal} skills matched
        </p>
        <span className="skill-match-badge">{resolvedPercentage}% match</span>
      </div>

      {skills.length === 0 ? (
        <p className="skill-match-empty">
          Skill breakdown will appear here once analysis data is available.
        </p>
      ) : (
        <ul className="skill-bar-list">
          {skills.map((skill) => (
            <li className="skill-bar-item" key={skill.name}>
              <div className="skill-bar-header">
                <span className="skill-bar-name">{skill.name}</span>
                <span className="skill-bar-percent">{skill.score ?? 0}%</span>
              </div>
              <div className="skill-bar-track">
                <div
                  className="skill-bar-fill"
                  style={{ width: `${Math.max(0, Math.min(100, skill.score ?? 0))}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SkillMatchCard
