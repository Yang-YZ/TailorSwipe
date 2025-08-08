import React, { useState } from 'react'
import { useJobContext } from '../contexts/JobContext'
import { useResumeContext } from '../contexts/ResumeContext'
import { Job, ResumeCustomization } from '../types'
import { Building, MapPin, Calendar, DollarSign, CheckCircle, Clock, XCircle, Star } from 'lucide-react'
import toast from 'react-hot-toast'

export const JobApplications: React.FC = () => {
  const { state: jobState } = useJobContext()
  const { state: resumeState, addCustomization } = useResumeContext()
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [showCustomizationModal, setShowCustomizationModal] = useState(false)

  const handleApplyToJob = (job: Job) => {
    if (!resumeState.resume) {
      toast.error('Please create your resume first')
      return
    }

    setSelectedJob(job)
    setShowCustomizationModal(true)
  }

  const handleCustomizeAndApply = (customization: Partial<ResumeCustomization>) => {
    if (!selectedJob || !resumeState.resume) return

    const newCustomization: ResumeCustomization = {
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      company: selectedJob.company,
      customizedSummary: customization.customizedSummary || resumeState.resume.summary,
      customizedExperience: customization.customizedExperience || resumeState.resume.experience,
      customizedSkills: customization.customizedSkills || resumeState.resume.skills,
      appliedDate: new Date().toISOString(),
      status: 'applied'
    }

    addCustomization(newCustomization)
    setShowCustomizationModal(false)
    setSelectedJob(null)
    toast.success(`Applied to ${selectedJob.title} at ${selectedJob.company}!`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied':
        return 'bg-blue-100 text-blue-700'
      case 'interviewing':
        return 'bg-yellow-100 text-yellow-700'
      case 'accepted':
        return 'bg-success-100 text-success-700'
      case 'rejected':
        return 'bg-danger-100 text-danger-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'applied':
        return <Clock className="w-4 h-4" />
      case 'interviewing':
        return <Star className="w-4 h-4" />
      case 'accepted':
        return <CheckCircle className="w-4 h-4" />
      case 'rejected':
        return <XCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Applications</h1>
        <p className="text-gray-600">Track your job applications and customize your resume for each position</p>
      </div>

      {/* Liked Jobs Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Liked Jobs</h2>
        {jobState.likedJobs.length === 0 ? (
          <div className="card text-center py-8">
            <p className="text-gray-500">No liked jobs yet. Start swiping to find jobs you're interested in!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobState.likedJobs.map((job) => {
              const customization = resumeState.customizations.find(c => c.jobId === job.id)
              const hasApplied = customization !== undefined

              return (
                <div key={job.id} className="card">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{job.title}</h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <Building className="w-4 h-4 mr-2" />
                        <span className="font-medium">{job.company}</span>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm mb-2">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{job.location}</span>
                      </div>
                      {job.salary && (
                        <div className="flex items-center text-success-600 font-semibold text-sm">
                          <DollarSign className="w-4 h-4 mr-1" />
                          <span>{job.salary}</span>
                        </div>
                      )}
                    </div>
                    {hasApplied && (
                      <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(customization.status)}`}>
                        {getStatusIcon(customization.status)}
                        <span className="ml-1 capitalize">{customization.status}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                    {job.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      Posted {formatDate(job.postedDate)}
                    </div>
                    {hasApplied ? (
                      <div className="text-xs text-gray-500">
                        Applied {formatDate(customization.appliedDate)}
                      </div>
                    ) : (
                      <button
                        onClick={() => handleApplyToJob(job)}
                        className="btn-primary text-sm"
                      >
                        Apply Now
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Applications History */}
      {resumeState.customizations.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Application History</h2>
          <div className="card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Position</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Company</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Applied Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {resumeState.customizations.map((customization) => (
                    <tr key={customization.jobId} className="border-b border-gray-100">
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">{customization.jobTitle}</div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{customization.company}</td>
                      <td className="py-3 px-4 text-gray-600">{formatDate(customization.appliedDate)}</td>
                      <td className="py-3 px-4">
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(customization.status)}`}>
                          {getStatusIcon(customization.status)}
                          <span className="ml-1 capitalize">{customization.status}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Customization Modal */}
      {showCustomizationModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Customize Resume for {selectedJob.title}
              </h3>
              <button
                onClick={() => setShowCustomizationModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customized Summary
                </label>
                <textarea
                  defaultValue={resumeState.resume?.summary || ''}
                  className="input-field"
                  rows={4}
                  placeholder="Customize your summary to match this job..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relevant Skills (comma-separated)
                </label>
                <input
                  type="text"
                  defaultValue={resumeState.resume?.skills.join(', ') || ''}
                  className="input-field"
                  placeholder="JavaScript, React, TypeScript..."
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowCustomizationModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleCustomizeAndApply({})}
                  className="btn-primary"
                >
                  Apply with Customized Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 