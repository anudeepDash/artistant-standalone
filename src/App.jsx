import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useStore } from './lib/store'
import ArtistAnt from './pages/ArtistAnt'
import NeuralToast from './components/ui/NeuralToast'
import AuthOverlay from './components/auth/AuthOverlay'

function App() {
  const { subscribeToData } = useStore()

  useEffect(() => {
    const unsub = subscribeToData()
    return () => {
      if (unsub) unsub()
    }
  }, [subscribeToData])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ArtistAnt />} />
        <Route path="*" element={<ArtistAnt />} />
      </Routes>
      <AuthOverlay />
      <NeuralToast />
    </Router>
  )
}

export default App
