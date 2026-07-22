// ResumeSummaryCard
//
// Expected props (all optional — renders a placeholder dash when missing):
//   resumeName          string   e.g. "Alex_Morgan.pdf"
//   selectedGoal        string   e.g. "Job compatibility"
//   jobTitle            string   e.g. "Senior Product Manager"
//   analysisDate        string   e.g. "July 12, 2026"
//   totalSkills         number
//   matchedSkillsCount  number
//   missingSkillsCount  number

const FALLBACK = '—'

function MetaField({ label, value }) {
  return (
    <div className="summary-meta-field">
      <p className="summary-meta-label">{label}</p>
      <p className="summary-meta-value">{value ?? FALLBACK}</p>
    </div>
  )
}

function StatField({ value, label }) {
  return (
    <div className="summary-stat">
      <p className="summary-stat-value">{value ?? FALLBACK}</p>
      <p className="summary-stat-label">{label}</p>
    </div>
  )
}

function ResumeSummaryCard({
  resumeName,
  selectedGoal,
  jobTitle,
  analysisDate,
  totalSkills,
  matchedSkillsCount,
  missingSkillsCount,
}) {
  return (
    <div className="result-card summary-card">
      <div className="result-card-top">
        <p className="eyebrow">Parsed profile</p>
        <span className="result-card-marker" aria-hidden="true" />
      </div>
      <h2 className="result-card-title">Resume summary</h2>

      <div className="summary-meta-grid">
        <MetaField label="Resume name" value={resumeName} />
        <MetaField label="Selected goal" value={selectedGoal} />
        <MetaField label="Job title" value={jobTitle} />
        <MetaField label="Analysis date" value={analysisDate} />
      </div>

      <div className="summary-stats-row">
        <StatField value={totalSkills} label="Total skills" />
        <StatField value={matchedSkillsCount} label="Matched skills" />
        <StatField value={missingSkillsCount} label="Missing skills" />
      </div>
    </div>
  )
}

export default ResumeSummaryCard
