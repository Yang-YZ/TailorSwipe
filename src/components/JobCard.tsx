import React, { useState } from 'react'
import { MapPin, Building, DollarSign, Calendar, Clock, GraduationCap, Briefcase, CheckCircle, Star } from 'lucide-react'
import { Job } from '../types'

interface JobCardProps {
  job: Job
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [showDetails, setShowDetails] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h2>
            <div className="flex items-center text-gray-600 mb-2">
              <Building className="w-4 h-4 mr-2" />
              <span className="font-medium">{job.company}</span>
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{job.location}</span>
              {job.remote && (
                <span className="ml-2 px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                  Remote
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            {job.salary && (
              <div className="flex items-center text-success-600 font-semibold mb-1">
                <DollarSign className="w-4 h-4 mr-1" />
                <span>{job.salary}</span>
              </div>
            )}
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Posted {formatDate(job.postedDate)}</span>
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          {job.experience && (
            <div className="flex items-center text-gray-600">
              <Briefcase className="w-4 h-4 mr-2" />
              <span>{job.experience}</span>
            </div>
          )}
          {job.education && (
            <div className="flex items-center text-gray-600">
              <GraduationCap className="w-4 h-4 mr-2" />
              <span>{job.education}</span>
            </div>
          )}
          {job.fullTime && (
            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              <span>Full-time</span>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="p-6">
        <p className="text-gray-700 mb-4 line-clamp-3">
          {job.description}
        </p>

        {/* Requirements Preview */}
        {!showDetails && job.requirements.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Key Requirements:</h4>
            <div className="space-y-1">
              {job.requirements.slice(0, 3).map((req, index) => (
                <div key={index} className="flex items-start text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-success-500 flex-shrink-0" />
                  <span>{req}</span>
                </div>
              ))}
              {job.requirements.length > 3 && (
                <p className="text-primary-600 text-sm font-medium">
                  +{job.requirements.length - 3} more requirements
                </p>
              )}
            </div>
          </div>
        )}

        {/* Benefits Preview */}
        {!showDetails && job.benefits.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Benefits:</h4>
            <div className="space-y-1">
              {job.benefits.slice(0, 3).map((benefit, index) => (
                <div key={index} className="flex items-start text-sm text-gray-600">
                  <Star className="w-4 h-4 mr-2 mt-0.5 text-yellow-500 flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
              {job.benefits.length > 3 && (
                <p className="text-primary-600 text-sm font-medium">
                  +{job.benefits.length - 3} more benefits
                </p>
              )}
            </div>
          </div>
        )}

        {/* Detailed View */}
        {showDetails && (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
              <div className="space-y-1">
                {job.requirements.map((req, index) => (
                  <div key={index} className="flex items-start text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-success-500 flex-shrink-0" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Benefits:</h4>
              <div className="space-y-1">
                {job.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start text-sm text-gray-600">
                    <Star className="w-4 h-4 mr-2 mt-0.5 text-yellow-500 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Toggle Details Button */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full mt-4 text-primary-600 hover:text-primary-700 font-medium text-sm"
        >
          {showDetails ? 'Show less' : 'Show more details'}
        </button>
      </div>
    </div>
  )
} 