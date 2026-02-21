import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import GrammarGames from './pages/GrammarGames'
import HallOfFameGuide from './pages/HallOfFameGuide'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/grammar" element={<GrammarGames />} />
        <Route path="/hall-of-fame" element={<HallOfFameGuide />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
