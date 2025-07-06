import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AdmissionForm from './pages/AdmissionForm'

function App() {
  const [count, setCount] = useState(0)

  return (
     <div className="bg-gray-100 min-h-screen">
      <AdmissionForm />
    </div>
  )
}

export default App
