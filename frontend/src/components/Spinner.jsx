import './Spinner.css'

function Spinner({ size = 'md' }) {
  return <span className={`spinner spinner-${size}`} aria-hidden="true" />
}

export default Spinner
