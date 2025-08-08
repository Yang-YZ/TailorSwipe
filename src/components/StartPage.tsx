import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useResumeContext } from '../contexts/ResumeContext'
import { mockJobs } from '../data/mockJobs'
import { useJobContext } from '../contexts/JobContext'

export const StartPage: React.FC = () => {
  const [resumeText, setResumeText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { setResume } = useResumeContext()
  const { setJobs } = useJobContext()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!resumeText.trim()) {
      alert('Please paste your resume')
      return
    }

    setIsLoading(true)

    try {
      // Store the raw resume text
      setResume({
        id: Date.now().toString(),
        name: 'User',
        email: '',
        phone: '',
        summary: '',
        experience: [],
        education: [],
        skills: [],
        customizations: [],
        rawText: resumeText.trim()
      })

      // Load mock jobs
      setJobs(mockJobs)

      // Navigate to jobs page
      navigate('/jobs')
    } catch (error) {
      console.error('Error processing resume:', error)
      alert('Error processing resume. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">TailorSwipe</h1>
        <p className="text-gray-600">Paste your resume and find jobs that match your skills</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Paste Your Resume
            </label>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="w-full h-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Paste your resume text here...&#10;&#10;Example:&#10;John Doe&#10;Software Engineer&#10;Experience:&#10;- 3 years at TechCorp&#10;- Built web applications with React&#10;Skills: JavaScript, React, TypeScript"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !resumeText.trim()}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : 'Start Finding Jobs'}
          </button>
        </form>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Your resume will be used to customize applications for each job</p>
      </div>
    </div>
  )
} 