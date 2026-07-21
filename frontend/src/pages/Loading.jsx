import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import API from "../services/api"

import Navbar from '../components/Navbar.jsx'
import AnalysisHeader from '../components/AnalysisHeader.jsx'
import ProcessingCard from '../components/ProcessingCard.jsx'
import WorkflowList from '../components/WorkflowList.jsx'
import LiveStatus from '../components/LiveStatus.jsx'
import EstimatedCompletion from '../components/EstimatedCompletion.jsx'
import LoadingBars from '../components/LoadingBars.jsx'
import Footer from '../components/Footer.jsx'
import HelpButton from '../components/HelpButton.jsx'
import '../styles/Loading.css'

const WORKFLOW_STEPS = [
  'Resume Uploaded',
  'Job Description Uploaded',
  'Parsing Resume',
  'Parsing Job Description',
  'Extracting Skills',
  'Comparing Resume & Job Description',
  'Calculating Compatibility Score',
  'Generating Recommendations',
  'Preparing Final Report',
]

// The first two steps (uploads) are already complete by the time a user
// reaches this screen, so the simulated workflow starts on step index 2.
const START_INDEX = 2
const STEP_INTERVAL_MS = 1700

function Loading() {
  const location = useLocation()
  const navigate = useNavigate()
  const { resumeFile, jobDescMode, jobDescFile, jobDescText } = location.state ?? {}

  const [activeIndex, setActiveIndex] = useState(START_INDEX)

  useEffect(() => {
    if (activeIndex >= WORKFLOW_STEPS.length) return undefined

    const timer = setInterval(() => {
      setActiveIndex((current) => Math.min(current + 1, WORKFLOW_STEPS.length))
    }, STEP_INTERVAL_MS)

    return () => clearInterval(timer)
  }, [activeIndex])

  // Fire the analysis request in the background. The workflow/percent
  // animation above runs independently and keeps playing while this
  // resolves.
  useEffect(() => {
    if (!resumeFile) {
      // No data was handed off via router state (e.g. the page was opened
      // directly), so there is nothing to analyze.
      navigate('/', { replace: true })
      return
    }

    const controller = new AbortController()

    const runAnalysis = async () => {
      const formData = new FormData()
      formData.append('resume', resumeFile)

      if (jobDescMode === "paste") {
    formData.append("job_description", jobDescText);
} else {
    alert("Please use Paste Description for now.");
    navigate("/");
    return;
}

      try {
        console.log("Sending request...");
        const response = await API.post("/analyze/job-match", formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          signal: controller.signal,
        })
        console.log("Backend responded:", response.data);
        console.log("Navigating to Results...");
        navigate('/results', { state: response.data })
      } catch (error) {
  console.error(error);

  if (error.response?.status === 429) {
    alert("AI service is currently busy or quota has been exceeded. Please try again later.");
  } else {
    alert(error.response?.data?.detail || "Resume analysis failed.");
  }

  navigate("/");
}
    }

    runAnalysis()

    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const percent = Math.min(
    100,
    Math.round(((activeIndex + 0.5) / WORKFLOW_STEPS.length) * 100),
  )

  return (
    <div className="page">
      <Navbar badge="Analysis / Live" active="features" />

      <main>
        <AnalysisHeader breadcrumb="Career Match / Analysis" session="Session 04F-92" />

        <div className="container loading-container">
          <ProcessingCard
            heading="Analyzing Your Resume"
            description="Our AI is evaluating your resume and job description to identify alignment, strengths, and actionable next steps."
          >
            <div className="processing-card-section">
              <div className="processing-card-section-header">
                <p className="processing-card-section-title">Processing workflow</p>
                <p className="processing-card-section-count">
                  {Math.min(activeIndex + 1, WORKFLOW_STEPS.length)} of{' '}
                  {WORKFLOW_STEPS.length}
                </p>
              </div>
              <WorkflowList steps={WORKFLOW_STEPS} activeIndex={activeIndex} />
            </div>

            <div className="processing-card-section">
              <LiveStatus percent={percent} />
            </div>

            <div className="processing-card-section">
              <EstimatedCompletion estimate="Less than 30 seconds" />
            </div>

            <div className="processing-card-section">
              <LoadingBars />
            </div>
          </ProcessingCard>

          <p className="loading-note">
            Please wait while our AI analyzes your profile. This may take a few
            seconds.
          </p>
        </div>
      </main>

      <Footer tagline="Secure, private analysis in progress." />
      <HelpButton />
    </div>
  )
}

export default Loading
