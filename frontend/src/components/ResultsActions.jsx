import { useNavigate } from 'react-router-dom'

// ResultsActions
//
// Expected props:
//   onDownloadPdf   optional function, called when "Download PDF Report" is
//                   clicked. No PDF generation happens in this component —
//                   wire up the real behavior via this prop when the backend
//                   endpoint is ready.

function ResultsActions({ onDownloadPdf }) {
  const navigate = useNavigate()

  const handleDownload = () => {
    if (onDownloadPdf) onDownloadPdf()
  }

  const handleAnalyzeAnother = () => {
    navigate('/')
  }

  return (
    <div className="results-actions">
      <p className="results-actions-note">
        Your report is ready. Download a copy to keep your recommendations
        close during your application process.
      </p>

      <div className="results-actions-buttons">
        <button
          type="button"
          className="results-action-button results-action-primary"
          onClick={handleDownload}
        >
          <span aria-hidden="true">&#8595;</span>
          Download PDF Report
        </button>
        <button
          type="button"
          className="results-action-button results-action-secondary"
          onClick={handleAnalyzeAnother}
        >
          Analyze Another Resume
          <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
    </div>
  )
}

export default ResultsActions
