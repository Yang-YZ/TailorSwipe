import React, { useEffect, useState } from 'react'
import { useJobContext } from '../contexts/JobContext'
import { useResumeContext } from '../contexts/ResumeContext'
import { Job } from '../types'
import { mockJobs } from '../data/mockJobs'

export const JobSwipe: React.FC = () => {
  const { state, likeJob, dislikeJob, setJobs, getCurrentJob } = useJobContext()
  const { state: resumeState, addCustomization } = useResumeContext()
  const [currentJob, setCurrentJob] = useState<Job | null>(null)
  const [isCustomizing, setIsCustomizing] = useState(false)

  useEffect(() => {
    if (state.jobs.length === 0) {
      setJobs(mockJobs)
    }
  }, [state.jobs.length, setJobs])

  useEffect(() => {
    setCurrentJob(getCurrentJob())
  }, [state.currentJobIndex, getCurrentJob])

  const customizeResumeForJob = async (job: Job) => {
    if (!resumeState.resume?.rawText) {
      alert('No resume found')
      return
    }

    setIsCustomizing(true)

    try {
      // Simulate LLM customization
      const customizedResume = await simulateLLMCustomization(
        resumeState.resume.rawText,
        job
      )

      const customization = {
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        customizedSummary: '',
        customizedExperience: [],
        customizedSkills: [],
        appliedDate: new Date().toISOString(),
        status: 'applied' as const,
        customizedResume
      }

      addCustomization(customization)
      alert(`Applied to ${job.title} at ${job.company}!`)
    } catch (error) {
      console.error('Error customizing resume:', error)
      alert('Error customizing resume')
    } finally {
      setIsCustomizing(false)
    }
  }

  const simulateLLMCustomization = async (resumeText: string, job: Job): Promise<string> => {
    // Import and use the LLM service
    const { LLMService } = await import('../services/llmService')
    
    try {
      const result = await LLMService.customizeResume(resumeText, job)
      return result.customizedResume
    } catch (error) {
      console.error('LLM customization failed:', error)
      // Fallback to simple customization
      return resumeText + `\n\n--- CUSTOMIZED FOR ${job.company} ---\nPosition: ${job.title}`
    }
  }

  const handleSwipe = (direction: 'left' | 'right') => {
    if (!currentJob) return

    if (direction === 'right') {
      likeJob(currentJob)
      customizeResumeForJob(currentJob)
    } else {
      dislikeJob(currentJob)
    }
  }

  if (!currentJob) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No More Jobs</h2>
        <p className="text-gray-600 mb-6">You've seen all available jobs.</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Start Over
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Find Your Job</h1>
        <p className="text-gray-600">Swipe right to apply, left to pass</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{currentJob.title}</h2>
          <p className="text-gray-600 mb-2">{currentJob.company}</p>
          <p className="text-gray-500 text-sm mb-4">{currentJob.location}</p>
          {currentJob.salary && (
            <p className="text-green-600 font-semibold mb-4">{currentJob.salary}</p>
          )}
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-gray-900 mb-2">Description:</h3>
          <p className="text-gray-700 text-sm">{currentJob.description}</p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-gray-900 mb-2">Requirements:</h3>
          <ul className="text-sm text-gray-700">
            {currentJob.requirements.slice(0, 3).map((req, index) => (
              <li key={index} className="mb-1">• {req}</li>
            ))}
          </ul>
        </div>

        <div className="text-xs text-gray-500">
          Posted {new Date(currentJob.postedDate).toLocaleDateString()}
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={() => handleSwipe('left')}
          disabled={isCustomizing}
          className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 disabled:opacity-50"
        >
          ✕
        </button>

        <button
          onClick={() => handleSwipe('right')}
          disabled={isCustomizing}
          className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 disabled:opacity-50"
        >
          ✓
        </button>
      </div>

      {isCustomizing && (
        <div className="mt-4 text-center text-sm text-gray-600">
          Customizing your resume for this job...
        </div>
      )}

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>{state.currentJobIndex + 1} of {state.jobs.length} jobs</p>
      </div>
    </div>
  )
} 