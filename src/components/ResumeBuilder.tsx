import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Plus, Trash2, Save, Download, Edit3 } from 'lucide-react'
import { useResumeContext } from '../contexts/ResumeContext'
import { Resume, WorkExperience, Education } from '../types'
import toast from 'react-hot-toast'

interface ResumeFormData {
  name: string
  email: string
  phone: string
  summary: string
}

export const ResumeBuilder: React.FC = () => {
  const { state, setResume, updateResume } = useResumeContext()
  const [activeSection, setActiveSection] = useState<'personal' | 'experience' | 'education' | 'skills'>('personal')
  const [editingExperience, setEditingExperience] = useState<WorkExperience | null>(null)
  const [editingEducation, setEditingEducation] = useState<Education | null>(null)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ResumeFormData>()

  const handlePersonalInfoSubmit = (data: ResumeFormData) => {
    if (!state.resume) {
      const newResume: Resume = {
        id: Date.now().toString(),
        ...data,
        experience: [],
        education: [],
        skills: [],
        customizations: []
      }
      setResume(newResume)
    } else {
      updateResume(data)
    }
    toast.success('Personal information saved!')
  }

  const addExperience = () => {
    const newExperience: WorkExperience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: [''],
      achievements: ['']
    }
    
    if (!state.resume) {
      toast.error('Please fill in your personal information first')
      return
    }

    const updatedExperience = [...state.resume.experience, newExperience]
    updateResume({ experience: updatedExperience })
    setEditingExperience(newExperience)
  }

  const updateExperience = (id: string, updates: Partial<WorkExperience>) => {
    if (!state.resume) return

    const updatedExperience = state.resume.experience.map(exp =>
      exp.id === id ? { ...exp, ...updates } : exp
    )
    updateResume({ experience: updatedExperience })
  }

  const removeExperience = (id: string) => {
    if (!state.resume) return

    const updatedExperience = state.resume.experience.filter(exp => exp.id !== id)
    updateResume({ experience: updatedExperience })
    toast.success('Experience removed')
  }

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: ''
    }
    
    if (!state.resume) {
      toast.error('Please fill in your personal information first')
      return
    }

    const updatedEducation = [...state.resume.education, newEducation]
    updateResume({ education: updatedEducation })
    setEditingEducation(newEducation)
  }

  const updateEducation = (id: string, updates: Partial<Education>) => {
    if (!state.resume) return

    const updatedEducation = state.resume.education.map(edu =>
      edu.id === id ? { ...edu, ...updates } : edu
    )
    updateResume({ education: updatedEducation })
  }

  const removeEducation = (id: string) => {
    if (!state.resume) return

    const updatedEducation = state.resume.education.filter(edu => edu.id !== id)
    updateResume({ education: updatedEducation })
    toast.success('Education removed')
  }

  const addSkill = (skill: string) => {
    if (!state.resume) return

    const updatedSkills = [...state.resume.skills, skill]
    updateResume({ skills: updatedSkills })
  }

  const removeSkill = (skillToRemove: string) => {
    if (!state.resume) return

    const updatedSkills = state.resume.skills.filter(skill => skill !== skillToRemove)
    updateResume({ skills: updatedSkills })
  }

  const handleSkillSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const skill = formData.get('skill') as string
    
    if (skill.trim()) {
      addSkill(skill.trim())
      e.currentTarget.reset()
    }
  }

  const downloadResume = () => {
    if (!state.resume) {
      toast.error('No resume to download')
      return
    }

    // Simple text-based resume generation
    let resumeText = `${state.resume.name}\n`
    resumeText += `${state.resume.email} | ${state.resume.phone}\n\n`
    resumeText += `SUMMARY\n${state.resume.summary}\n\n`
    
    resumeText += `EXPERIENCE\n`
    state.resume.experience.forEach(exp => {
      resumeText += `${exp.position} at ${exp.company}\n`
      resumeText += `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}\n`
      exp.description.forEach(desc => {
        resumeText += `• ${desc}\n`
      })
      resumeText += '\n'
    })

    resumeText += `EDUCATION\n`
    state.resume.education.forEach(edu => {
      resumeText += `${edu.degree} in ${edu.field}\n`
      resumeText += `${edu.institution}\n`
      resumeText += `${edu.startDate} - ${edu.current ? 'Present' : edu.endDate}\n\n`
    })

    resumeText += `SKILLS\n${state.resume.skills.join(', ')}\n`

    const blob = new Blob([resumeText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${state.resume.name.replace(/\s+/g, '_')}_resume.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    toast.success('Resume downloaded!')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Builder</h1>
        <p className="text-gray-600">Create and customize your resume for different job applications</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-8 bg-gray-100 rounded-lg p-1">
        {(['personal', 'experience', 'education', 'skills'] as const).map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeSection === section
                ? 'bg-white text-primary-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>

      {/* Personal Information */}
      {activeSection === 'personal' && (
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
          <form onSubmit={handleSubmit(handlePersonalInfoSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  defaultValue={state.resume?.name || ''}
                  className="input-field"
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-danger-600 text-sm mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  defaultValue={state.resume?.email || ''}
                  className="input-field"
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-danger-600 text-sm mt-1">{errors.email.message}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                {...register('phone', { required: 'Phone is required' })}
                defaultValue={state.resume?.phone || ''}
                className="input-field"
                placeholder="+1 (555) 123-4567"
              />
              {errors.phone && <p className="text-danger-600 text-sm mt-1">{errors.phone.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
              <textarea
                {...register('summary', { required: 'Summary is required' })}
                defaultValue={state.resume?.summary || ''}
                className="input-field"
                rows={4}
                placeholder="A brief overview of your professional background, key skills, and career objectives..."
              />
              {errors.summary && <p className="text-danger-600 text-sm mt-1">{errors.summary.message}</p>}
            </div>
            <button type="submit" className="btn-primary">
              <Save className="w-4 h-4 mr-2" />
              Save Personal Information
            </button>
          </form>
        </div>
      )}

      {/* Work Experience */}
      {activeSection === 'experience' && (
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
            <button onClick={addExperience} className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </button>
          </div>
          
          {state.resume?.experience.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No work experience added yet. Click "Add Experience" to get started.</p>
          ) : (
            <div className="space-y-4">
              {state.resume?.experience.map((exp) => (
                <div key={exp.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">{exp.position || 'Position'}</h3>
                    <button
                      onClick={() => removeExperience(exp.id)}
                      className="text-danger-600 hover:text-danger-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                        className="input-field"
                        placeholder="Company Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                      <input
                        type="text"
                        value={exp.position}
                        onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                        className="input-field"
                        placeholder="Job Title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <input
                        type="month"
                        value={exp.endDate || ''}
                        onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                        className="input-field"
                        disabled={exp.current}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={exp.current}
                        onChange={(e) => updateExperience(exp.id, { current: e.target.checked })}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Currently working here</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Education */}
      {activeSection === 'education' && (
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Education</h2>
            <button onClick={addEducation} className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Education
            </button>
          </div>
          
          {state.resume?.education.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No education added yet. Click "Add Education" to get started.</p>
          ) : (
            <div className="space-y-4">
              {state.resume?.education.map((edu) => (
                <div key={edu.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">{edu.degree || 'Degree'}</h3>
                    <button
                      onClick={() => removeEducation(edu.id)}
                      className="text-danger-600 hover:text-danger-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                        className="input-field"
                        placeholder="University Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                        className="input-field"
                        placeholder="Bachelor's Degree"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                      <input
                        type="text"
                        value={edu.field}
                        onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                        className="input-field"
                        placeholder="Computer Science"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">GPA (Optional)</label>
                      <input
                        type="text"
                        value={edu.gpa || ''}
                        onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                        className="input-field"
                        placeholder="3.8"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <input
                        type="month"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <input
                        type="month"
                        value={edu.endDate || ''}
                        onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                        className="input-field"
                        disabled={edu.current}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={edu.current}
                        onChange={(e) => updateEducation(edu.id, { current: e.target.checked })}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Currently studying here</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Skills */}
      {activeSection === 'skills' && (
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Skills</h2>
          
          <form onSubmit={handleSkillSubmit} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                name="skill"
                className="input-field flex-1"
                placeholder="Add a skill (e.g., JavaScript, Project Management)"
              />
              <button type="submit" className="btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add
              </button>
            </div>
          </form>

          {state.resume?.skills.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No skills added yet. Add your technical and soft skills above.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {state.resume?.skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center bg-primary-100 text-primary-700 px-3 py-1 rounded-full"
                >
                  <span className="text-sm">{skill}</span>
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-primary-600 hover:text-primary-800"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Download Button */}
      {state.resume && (
        <div className="mt-8 text-center">
          <button onClick={downloadResume} className="btn-secondary">
            <Download className="w-4 h-4 mr-2" />
            Download Resume
          </button>
        </div>
      )}
    </div>
  )
} 