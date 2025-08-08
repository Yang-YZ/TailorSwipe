import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { Job, SwipeAction } from '../types'

interface JobState {
  jobs: Job[]
  likedJobs: Job[]
  dislikedJobs: Job[]
  swipeHistory: SwipeAction[]
  currentJobIndex: number
}

type JobAction =
  | { type: 'SET_JOBS'; payload: Job[] }
  | { type: 'LIKE_JOB'; payload: Job }
  | { type: 'DISLIKE_JOB'; payload: Job }
  | { type: 'NEXT_JOB' }
  | { type: 'RESET_SWIPES' }

const initialState: JobState = {
  jobs: [],
  likedJobs: [],
  dislikedJobs: [],
  swipeHistory: [],
  currentJobIndex: 0,
}

const jobReducer = (state: JobState, action: JobAction): JobState => {
  switch (action.type) {
    case 'SET_JOBS':
      return { ...state, jobs: action.payload }
    case 'LIKE_JOB':
      return {
        ...state,
        likedJobs: [...state.likedJobs, action.payload],
        swipeHistory: [...state.swipeHistory, {
          jobId: action.payload.id,
          action: 'like',
          timestamp: new Date().toISOString()
        }],
        currentJobIndex: state.currentJobIndex + 1
      }
    case 'DISLIKE_JOB':
      return {
        ...state,
        dislikedJobs: [...state.dislikedJobs, action.payload],
        swipeHistory: [...state.swipeHistory, {
          jobId: action.payload.id,
          action: 'dislike',
          timestamp: new Date().toISOString()
        }],
        currentJobIndex: state.currentJobIndex + 1
      }
    case 'NEXT_JOB':
      return { ...state, currentJobIndex: state.currentJobIndex + 1 }
    case 'RESET_SWIPES':
      return { ...state, likedJobs: [], dislikedJobs: [], swipeHistory: [], currentJobIndex: 0 }
    default:
      return state
  }
}

interface JobContextType {
  state: JobState
  likeJob: (job: Job) => void
  dislikeJob: (job: Job) => void
  nextJob: () => void
  resetSwipes: () => void
  setJobs: (jobs: Job[]) => void
  getCurrentJob: () => Job | null
}

const JobContext = createContext<JobContextType | undefined>(undefined)

export const JobProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(jobReducer, initialState)

  const likeJob = (job: Job) => {
    dispatch({ type: 'LIKE_JOB', payload: job })
  }

  const dislikeJob = (job: Job) => {
    dispatch({ type: 'DISLIKE_JOB', payload: job })
  }

  const nextJob = () => {
    dispatch({ type: 'NEXT_JOB' })
  }

  const resetSwipes = () => {
    dispatch({ type: 'RESET_SWIPES' })
  }

  const setJobs = (jobs: Job[]) => {
    dispatch({ type: 'SET_JOBS', payload: jobs })
  }

  const getCurrentJob = (): Job | null => {
    return state.jobs[state.currentJobIndex] || null
  }

  return (
    <JobContext.Provider value={{
      state,
      likeJob,
      dislikeJob,
      nextJob,
      resetSwipes,
      setJobs,
      getCurrentJob
    }}>
      {children}
    </JobContext.Provider>
  )
}

export const useJobContext = () => {
  const context = useContext(JobContext)
  if (context === undefined) {
    throw new Error('useJobContext must be used within a JobProvider')
  }
  return context
} 