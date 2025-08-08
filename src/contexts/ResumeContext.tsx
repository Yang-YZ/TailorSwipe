import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { Resume, ResumeCustomization, WorkExperience, Education } from '../types'

interface ResumeState {
  resume: Resume | null
  customizations: ResumeCustomization[]
  isLoading: boolean
}

type ResumeAction =
  | { type: 'SET_RESUME'; payload: Resume }
  | { type: 'UPDATE_RESUME'; payload: Partial<Resume> }
  | { type: 'ADD_CUSTOMIZATION'; payload: ResumeCustomization }
  | { type: 'UPDATE_CUSTOMIZATION'; payload: { jobId: string; customization: Partial<ResumeCustomization> } }
  | { type: 'SET_LOADING'; payload: boolean }

const initialState: ResumeState = {
  resume: null,
  customizations: [],
  isLoading: false,
}

const resumeReducer = (state: ResumeState, action: ResumeAction): ResumeState => {
  switch (action.type) {
    case 'SET_RESUME':
      return { ...state, resume: action.payload }
    case 'UPDATE_RESUME':
      return { 
        ...state, 
        resume: state.resume ? { ...state.resume, ...action.payload } : null 
      }
    case 'ADD_CUSTOMIZATION':
      return { 
        ...state, 
        customizations: [...state.customizations, action.payload] 
      }
    case 'UPDATE_CUSTOMIZATION':
      return {
        ...state,
        customizations: state.customizations.map(customization =>
          customization.jobId === action.payload.jobId
            ? { ...customization, ...action.payload.customization }
            : customization
        )
      }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    default:
      return state
  }
}

interface ResumeContextType {
  state: ResumeState
  setResume: (resume: Resume) => void
  updateResume: (updates: Partial<Resume>) => void
  addCustomization: (customization: ResumeCustomization) => void
  updateCustomization: (jobId: string, customization: Partial<ResumeCustomization>) => void
  setLoading: (loading: boolean) => void
  getCustomizationForJob: (jobId: string) => ResumeCustomization | null
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined)

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(resumeReducer, initialState)

  const setResume = (resume: Resume) => {
    dispatch({ type: 'SET_RESUME', payload: resume })
  }

  const updateResume = (updates: Partial<Resume>) => {
    dispatch({ type: 'UPDATE_RESUME', payload: updates })
  }

  const addCustomization = (customization: ResumeCustomization) => {
    dispatch({ type: 'ADD_CUSTOMIZATION', payload: customization })
  }

  const updateCustomization = (jobId: string, customization: Partial<ResumeCustomization>) => {
    dispatch({ type: 'UPDATE_CUSTOMIZATION', payload: { jobId, customization } })
  }

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading })
  }

  const getCustomizationForJob = (jobId: string): ResumeCustomization | null => {
    return state.customizations.find(c => c.jobId === jobId) || null
  }

  return (
    <ResumeContext.Provider value={{
      state,
      setResume,
      updateResume,
      addCustomization,
      updateCustomization,
      setLoading,
      getCustomizationForJob
    }}>
      {children}
    </ResumeContext.Provider>
  )
}

export const useResumeContext = () => {
  const context = useContext(ResumeContext)
  if (context === undefined) {
    throw new Error('useResumeContext must be used within a ResumeProvider')
  }
  return context
} 