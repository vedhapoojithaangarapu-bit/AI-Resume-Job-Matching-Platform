// ResumeSuggestionsCard
//
// Expected props:
//   suggestions   array of strings

function ResumeSuggestionsCard({ suggestions = [] }) {
  return (
    <div className="result-card suggestions-card">
      <div className="result-card-top">
        <p className="eyebrow">Resume optimization</p>
        <span className="result-card-marker" aria-hidden="true" />
      </div>
      <h2 className="result-card-title">Resume improvement suggestions</h2>

      {suggestions.length === 0 ? (
        <p className="suggestions-empty">
          Suggestions will appear here once analysis data is available.
        </p>
      ) : (
        <ol className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li className="suggestion-item" key={suggestion}>
              <span className="suggestion-index">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="suggestion-text">{suggestion}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

export default ResumeSuggestionsCard
