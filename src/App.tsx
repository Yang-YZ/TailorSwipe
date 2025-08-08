import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { StartPage } from './components/StartPage'
import { JobSwipe } from './components/JobSwipe'
import { ResumeProvider } from './contexts/ResumeContext'
import { JobProvider } from './contexts/JobContext'

function App() {
  return (
    <ResumeProvider>
      <JobProvider>
        <div className="min-h-screen bg-gray-50">
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<StartPage />} />
              <Route path="/jobs" element={<JobSwipe />} />
            </Routes>
          </main>
        </div>
      </JobProvider>
    </ResumeProvider>
  )
}

export default App 