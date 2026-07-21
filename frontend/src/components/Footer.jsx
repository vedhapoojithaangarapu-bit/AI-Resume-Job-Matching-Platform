import './Footer.css'

function Footer({ tagline = 'Built for thoughtful, evidence-based career decisions.' }) {
  return (
    <footer className="footer" id="contact">
      <div className="container footer-inner">
        <a className="footer-logo" href="#top">
          <span className="footer-logo-mark" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </span>
          Career Match
        </a>

        <p className="footer-tagline">{tagline}</p>

        <p className="footer-copy">&copy; 2026</p>
      </div>
    </footer>
  )
}

export default Footer
