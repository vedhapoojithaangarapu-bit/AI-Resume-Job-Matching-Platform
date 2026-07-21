import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UploadSection.css";

const GOAL_LABELS = {
  'job-match': 'Job compatibility',
  'career-map': 'Career roadmap',
}

function Dropzone({ label, hint, file, onFileChange, id }) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragOver(false)
    const droppedFile = event.dataTransfer.files?.[0]
    if (droppedFile) onFileChange(droppedFile)
  }

  return (
    <label
      htmlFor={id}
      className={`dropzone${isDragOver ? ' dropzone-active' : ''}${
        file ? ' dropzone-filled' : ''
      }`}
      onDragOver={(event) => {
        event.preventDefault()
        setIsDragOver(true)
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
    >
      <input
        id={id}
        type="file"
        accept=".pdf,.docx"
        className="dropzone-input"
        onChange={(event) => onFileChange(event.target.files?.[0] ?? null)}
      />
      <span className="dropzone-icon" aria-hidden="true">
        &#8593;
      </span>
      <span className="dropzone-label">{file ? file.name : label}</span>
      {!file && <span className="dropzone-hint">{hint}</span>}
    </label>
  )
}

function UploadSection({ selectedGoal }) {
  const [resumeFile, setResumeFile] = useState(null)
  const [jobDescMode, setJobDescMode] = useState('upload')
  const [jobDescFile, setJobDescFile] = useState(null)
  const [jobDescText, setJobDescText] = useState('')
  const navigate = useNavigate();

const goalLabel = GOAL_LABELS[selectedGoal] ?? "No goal selected";

const canAnalyze =
  Boolean(resumeFile) &&
  (jobDescMode === "upload"
    ? Boolean(jobDescFile)
    : jobDescText.trim().length > 0);

const handleAnalyze = () => {
  if (!canAnalyze) return;

  navigate("/loading", {
    state: {
      resumeFile,
      jobDescMode,
      jobDescFile,
      jobDescText,
    },
  });
};

  return (
    <section className="upload-section" id="step-02">
      <div className="container upload-inner">
        <div className="upload-intro">
          <p className="eyebrow">Step 02</p>
          <h2 className="upload-title">Add your material</h2>
          <p className="upload-description">
            Your files are used to generate one focused analysis.
          </p>
        </div>

        <div className="upload-card">
          <div className="upload-columns">
            <div className="upload-column">
              <div className="upload-column-header">
                <span className="upload-column-title">Your resume</span>
                <span className="upload-required">Required</span>
              </div>
              <Dropzone
                id="resume-upload"
                label="Drop resume here"
                hint="PDF or DOCX · up to 10 MB"
                file={resumeFile}
                onFileChange={setResumeFile}
              />
            </div>

            <div className="upload-column">
              <div className="upload-column-header">
                <span className="upload-column-title">Job description</span>
                <span className="upload-required">Required</span>
              </div>

              <div className="upload-tabs" role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={jobDescMode === 'upload'}
                  className={`upload-tab${jobDescMode === 'upload' ? ' upload-tab-active' : ''}`}
                  onClick={() => setJobDescMode('upload')}
                >
                  Upload PDF/DOCX
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={jobDescMode === 'paste'}
                  className={`upload-tab${jobDescMode === 'paste' ? ' upload-tab-active' : ''}`}
                  onClick={() => setJobDescMode('paste')}
                >
                  Paste description
                </button>
              </div>

              {jobDescMode === 'upload' ? (
                <Dropzone
                  id="jobdesc-upload"
                  label="Drop job description here"
                  hint="PDF or DOCX · up to 10 MB"
                  file={jobDescFile}
                  onFileChange={setJobDescFile}
                />
              ) : (
                <textarea
                  className="upload-textarea"
                  placeholder="Paste the job description here"
                  value={jobDescText}
                  onChange={(event) => setJobDescText(event.target.value)}
                />
              )}
            </div>
          </div>

          <div className="upload-footer">
            <div className="upload-goal">
              <span className="upload-goal-label">Selected goal</span>
              <span className="upload-goal-badge">
                <span className="upload-goal-dot" aria-hidden="true" />
                {goalLabel}
              </span>
            </div>

            <button
    type="button"
    className="analyze-button"
    disabled={!canAnalyze}
    onClick={handleAnalyze}
>
              Analyze Resume
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UploadSection
