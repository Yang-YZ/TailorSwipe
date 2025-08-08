export interface Job {
  id: string
  title: string
  company: string
  location: string
  salary?: string
  description: string
  requirements: string[]
  benefits: string[]
  postedDate: string
  applicationDeadline?: string
  remote?: boolean
  fullTime?: boolean
  experience?: string
  education?: string
}

export interface Resume {
  id: string
  name: string
  email: string
  phone: string
  summary: string
  experience: WorkExperience[]
  education: Education[]
  skills: string[]
  customizations: ResumeCustomization[]
  rawText?: string // Store the original pasted resume text
}

export interface WorkExperience {
  id: string
  company: string
  position: string
  startDate: string
  endDate?: string
  current: boolean
  description: string[]
  achievements: string[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate?: string
  current: boolean
  gpa?: string
}

export interface ResumeCustomization {
  jobId: string
  jobTitle: string
  company: string
  customizedSummary: string
  customizedExperience: WorkExperience[]
  customizedSkills: string[]
  appliedDate: string
  status: 'applied' | 'interviewing' | 'rejected' | 'accepted'
  customizedResume?: string // Store the LLM-customized resume text
}

export interface SwipeAction {
  jobId: string
  action: 'like' | 'dislike'
  timestamp: string
} 