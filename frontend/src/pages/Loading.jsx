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
      } else if (jobDescMode === "upload" && jobDescFile) {
        // Read the uploaded file as text and send it
        const text = await jobDescFile.text();
        formData.append("job_description", text);
      } else {
        alert("Please provide a job description.");
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

        // Map the backend response shape to what Results.jsx expects
        const raw = response.data
        const report = raw?.report ?? raw ?? {}

        // Helper to ensure Gemini array outputs are actually arrays
        const ensureArray = (val) => Array.isArray(val) ? val : (val ? [val] : [])

        const matchedSkills = ensureArray(report.matchedSkills)
        const missingSkills = ensureArray(report.missingSkills)
        const transferableSkills = ensureArray(report.transferableSkills)
        const score = report.candidateFitScore ?? 0

        // Build a skill breakdown array from matched, transferable and missing skills
        const skillBreakdown = [
          ...matchedSkills.map((s) => ({ name: typeof s === 'string' ? s : s.skill ?? s.name ?? '', score: 90 })),
          ...transferableSkills.map((s) => ({ name: typeof s === 'string' ? s : s.skill ?? s.name ?? '', score: 65 })),
          ...missingSkills.map((s) => ({ name: typeof s === 'string' ? s : s.skill ?? s.name ?? '', score: 20 })),
        ]

        // Derive a match label from score
        let matchLabel = 'Needs Work'
        if (score >= 80) matchLabel = 'Excellent Match'
        else if (score >= 60) matchLabel = 'Good Match'
        else if (score >= 40) matchLabel = 'Moderate Match'

        // Build experience insights from analysis strings
        const experienceInsights = []
        if (report.experienceMatch) experienceInsights.push({ type: 'strength', title: 'Experience Match', description: typeof report.experienceMatch === 'string' ? report.experienceMatch : JSON.stringify(report.experienceMatch) })
        if (report.educationMatch) experienceInsights.push({ type: 'strength', title: 'Education Match', description: typeof report.educationMatch === 'string' ? report.educationMatch : JSON.stringify(report.educationMatch) })
        if (report.projectMatch) experienceInsights.push({ type: 'opportunity', title: 'Project Alignment', description: typeof report.projectMatch === 'string' ? report.projectMatch : JSON.stringify(report.projectMatch) })
        if (report.overallAnalysis) experienceInsights.push({ type: 'opportunity', title: 'Overall Analysis', description: typeof report.overallAnalysis === 'string' ? report.overallAnalysis : JSON.stringify(report.overallAnalysis) })

        // Build resume suggestions from resumeImprovements
        const resumeSuggestions = ensureArray(report.resumeImprovements).map((item) => {
          if (typeof item === 'string') return item
          if (item.suggestion) return `[${item.section ?? 'Tip'}] ${item.suggestion}`
          return item.description ?? JSON.stringify(item)
        })

        // Build roadmap steps from learningRoadmap
        const roadmapSteps = ensureArray(report.learningRoadmap).map((item) =>
          typeof item === 'string'
            ? { title: item, description: '' }
            : { title: item.step ?? item.title ?? item.skill ?? '', description: item.description ?? item.resource ?? item.learningObjective ?? '' }
        )

        // Also add skillRecommendations as roadmap steps if learningRoadmap is empty
        if (roadmapSteps.length === 0) {
          ensureArray(report.skillRecommendations).forEach((item) => {
            roadmapSteps.push({
              title: typeof item === 'string' ? item : `Learn: ${item.skill ?? ''}`,
              description: typeof item === 'string' ? '' : item.learningObjective ?? '',
            })
          })
          ensureArray(report.projectRecommendations).forEach((item) => {
            roadmapSteps.push({
              title: typeof item === 'string' ? item : `Build: ${item.title ?? ''}`,
              description: typeof item === 'string' ? '' : item.description ?? '',
            })
          })
        }

        // Build certifications
        const certifications = ensureArray(report.certificationRecommendations).map((item) =>
          typeof item === 'string'
            ? { name: item, provider: '' }
            : {
                name: item.name ?? item.certification ?? '',
                provider: item.provider ?? item.issuer ?? '',
                url: item.url,
              }
        )

        // Build job roles from jobRecommendations
        const jobRoles = ensureArray(report.jobRecommendations).map((item) =>
          typeof item === 'string'
            ? { title: item, matchPercentage: score }
            : {
                title: item.title ?? item.role ?? item,
                matchPercentage: item.matchPercentage ?? score,
                fitLabel: item.fitLabel,
                requiredSkills: ensureArray(item.requiredSkills),
                salary: item.salary,
                location: item.location,
              }
        )

        const mappedData = {
          resumeName: resumeFile.name,
          selectedGoal: location.state?.goalLabel ?? 'Job compatibility',
          jobTitle: jobDescMode === 'upload' && jobDescFile ? jobDescFile.name.replace(/\.[^/.]+$/, "") : 'Custom Description',
          analysisDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          compatibilityScore: score,
          matchLabel,
          headline: report.overallAnalysis ?? report.executiveSummary ?? '',
          summary: report.executiveSummary ?? report.overallAnalysis ?? '',
          experienceScore: score,
          skillsScore: matchedSkills.length > 0
            ? Math.round((matchedSkills.length / (matchedSkills.length + missingSkills.length)) * 100)
            : 0,
          atsScore: score,
          confidence: report.confidence ?? 'Medium',
          missingSkills: missingSkills.map((s) => typeof s === 'string' ? s : s.skill ?? s.name ?? ''),
          skillBreakdown,
          experienceInsights,
          resumeSuggestions,
          roadmapSteps,
          certifications,
          jobRoles,
          totalSkills: matchedSkills.length + transferableSkills.length + missingSkills.length,
          matchedSkillsCount: matchedSkills.length,
          overallRecommendation: report.overallRecommendation ?? '',
        }

        console.log("Mapped data for Results:", mappedData);
        navigate('/results', { state: mappedData })
      } catch (error) {
        console.error(error);
        if (error.name === 'CanceledError' || error.name === 'AbortError') return;
        if (error.response?.status === 429) {
          alert("AI service is currently busy or quota has been exceeded. Please wait 60 seconds and try again.");
        } else {
          alert(error.response?.data?.detail || "Resume analysis failed. Please try again.");
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
