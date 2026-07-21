// CertificationsCard
//
// Expected props:
//   certifications   array of {
//                       name: string,
//                       provider: string,
//                       url: string (optional),
//                     }

function CertificationsCard({ certifications = [] }) {
  return (
    <div className="result-card certifications-card">
      <div className="result-card-top">
        <p className="eyebrow">Learning signal</p>
        <span className="result-card-marker" aria-hidden="true" />
      </div>
      <h2 className="result-card-title">Recommended certifications</h2>

      {certifications.length === 0 ? (
        <p className="certifications-empty">
          Certification recommendations will appear here once analysis data
          is available.
        </p>
      ) : (
        <ul className="certifications-list">
          {certifications.map((cert) => {
            const label = cert.provider ? `${cert.name} · ${cert.provider}` : cert.name
            const content = (
              <>
                <span className="certification-label">{label}</span>
                <span className="certification-arrow" aria-hidden="true">
                  &rarr;
                </span>
              </>
            )

            return (
              <li className="certification-item" key={label}>
                {cert.url ? (
                  <a
                    className="certification-row certification-row-link"
                    href={cert.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {content}
                  </a>
                ) : (
                  <span className="certification-row">{content}</span>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default CertificationsCard
