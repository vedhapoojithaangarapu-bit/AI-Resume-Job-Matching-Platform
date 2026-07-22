// CompatibilityScoreCard
//
// Expected props (all optional — sensible fallbacks are used if the backend
// response doesn't include a field yet):
//   score           number 0-100   overall compatibility score
//   matchLabel      string         e.g. "Strong match" (auto-computed from
//                                  `score` if omitted)
//   headline        string         short verdict, e.g. "You are a
//                                  competitive fit."
//   summary         string         1-2 sentence AI explanation
//   experienceScore number 0-100   experience-fit sub-score
//   skillsScore     number 0-100   skills-fit sub-score
//   atsScore        number 0-100   ATS readability score
//   confidence      string         e.g. "High", "Medium", "Low"

function getMatchTier(score) {
  if (score >= 85) return 'Excellent match'
  if (score >= 70) return 'Strong match'
  if (score >= 50) return 'Moderate match'
  return 'Needs improvement'
}

function CircularScore({ score }) {
  const radius = 64
  const circumference = 2 * Math.PI * radius
  const clamped = Math.max(0, Math.min(100, score))
  const offset = circumference - (clamped / 100) * circumference

  return (
    <svg
      className="score-ring"
      viewBox="0 0 160 160"
      role="img"
      aria-label={`Compatibility score ${clamped}%`}
    >
      <circle
        className="score-ring-track"
        cx="80"
        cy="80"
        r={radius}
        fill="none"
        strokeWidth="12"
      />
      <circle
        className="score-ring-fill"
        cx="80"
        cy="80"
        r={radius}
        fill="none"
        strokeWidth="12"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 80 80)"
      />
      <text x="80" y="76" textAnchor="middle" className="score-ring-value">
        {clamped}%
      </text>
      <text x="80" y="98" textAnchor="middle" className="score-ring-caption">
        {getMatchTier(clamped).split(' ')[0].toUpperCase()} MATCH
      </text>
    </svg>
  )
}

function CompatibilityScoreCard({
  score = 0,
  matchLabel,
  headline = 'Your compatibility results are ready.',
  summary = 'A detailed comparison of your resume against the target role will appear here once analysis data is available.',
  experienceScore,
  skillsScore,
  atsScore,
  confidence,
}) {
  const label = matchLabel ?? getMatchTier(score)

  return (
    <div className="result-card score-card">
      <div className="result-card-top">
        <p className="eyebrow">Overall assessment</p>
        <span className="result-card-marker" aria-hidden="true" />
      </div>
      <h2 className="result-card-title">Compatibility score</h2>

      <div className="score-card-body">
        <div className="score-card-visual">
          <CircularScore score={score} />
          <p className="score-card-tier">{label}</p>
        </div>

        <div className="score-card-details">
          <h3 className="score-card-headline">{headline}</h3>
          <p className="score-card-summary">{summary}</p>

          {(experienceScore !== undefined || skillsScore !== undefined) && (
            <div className="score-card-pills">
              {experienceScore !== undefined && (
                <span className="score-pill">Experience {experienceScore}%</span>
              )}
              {skillsScore !== undefined && (
                <span className="score-pill">Skills {skillsScore}%</span>
              )}
            </div>
          )}
        </div>
      </div>

      {(atsScore !== undefined || confidence) && (
        <div className="score-card-footer">
          {atsScore !== undefined && (
            <div className="score-card-stat">
              <p className="score-card-stat-label">ATS score</p>
              <p className="score-card-stat-value">{atsScore}%</p>
            </div>
          )}
          {confidence && (
            <div className="score-card-stat">
              <p className="score-card-stat-label">Confidence</p>
              <p className="score-card-stat-value">{confidence}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CompatibilityScoreCard
