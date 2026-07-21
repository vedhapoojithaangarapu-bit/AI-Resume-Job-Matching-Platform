import './LoadingBars.css'

const BAR_HEIGHTS = [34, 58, 44, 66, 50, 30, 46, 60, 40, 54, 36, 62]

function LoadingBars() {
  return (
    <div className="loading-bars" role="img" aria-label="AI processing activity">
      {BAR_HEIGHTS.map((height, index) => (
        <span
          key={index}
          className="loading-bar"
          style={{
            '--bar-height': `${height}px`,
            animationDelay: `${index * 0.09}s`,
          }}
        />
      ))}
    </div>
  )
}

export default LoadingBars
