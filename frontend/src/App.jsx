import { Routes, Route } from 'react-router-dom'

import Landing from './pages/Landing.jsx'
import Loading from './pages/Loading.jsx'
import Results from './pages/Results.jsx'

import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  )
}

export default App