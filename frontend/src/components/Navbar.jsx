import './Navbar.css'

const LINKS = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'features', label: 'Features', href: '#features' },
  { id: 'contact', label: 'Contact', href: '#contact' },
]

function Navbar({ badge = 'Platform / 01', active = null }) {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a className="navbar-logo" href="#top">
          <span className="navbar-logo-mark" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </span>
          Career Match
        </a>

        <nav className="navbar-links" aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={link.id === active ? 'navbar-link-active' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <span className="navbar-badge">{badge}</span>
      </div>
    </header>
  )
}

export default Navbar
