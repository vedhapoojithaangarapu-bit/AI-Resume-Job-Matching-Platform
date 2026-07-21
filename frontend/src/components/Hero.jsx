import './Hero.css'

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-inner">
        <div className="hero-main">
          <p className="eyebrow hero-eyebrow">
            <span className="hero-eyebrow-line" aria-hidden="true" />
            Career Intelligence Workspace
          </p>
          <h1 className="hero-heading">AI Resume &amp; Job Matching Platform</h1>
        </div>

        <div className="hero-side">
          <p className="hero-description">
            Analyze your resume against target job descriptions using AI, then
            receive clear, personalized career recommendations.
          </p>
          <a className="hero-cta" href="#step-01">
            Start an analysis
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
