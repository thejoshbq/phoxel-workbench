import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import CyberpunkGridBackground from './components/layout/CyberpunkGridBackground'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import AccentTheme from './components/layout/AccentTheme'
import CommandPalette from './components/shared/CommandPalette'
import LandingPage from './pages/LandingPage'
import ToolsPage from './pages/ToolsPage'
import LabrynthPage from './pages/LabrynthPage'
import ReacherPage from './pages/ReacherPage'
import FirmwarePage from './pages/FirmwarePage'
import HardwarePage from './pages/HardwarePage'
import PynapsePage from './pages/PynapsePage'
import AxplorerPage from './pages/AxplorerPage'
import RoigbivPage from './pages/RoigbivPage'
import ContactPage from './pages/ContactPage'

function AppShell() {
  const location = useLocation()
  return (
    <>
      <CyberpunkGridBackground />
      <AccentTheme />
      <CommandPalette />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main key={location.pathname} className="flex-1 flex flex-col page-enter">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/labrynth" element={<LabrynthPage />} />
            <Route path="/reacher" element={<ReacherPage />} />
            <Route path="/firmware" element={<FirmwarePage />} />
            <Route path="/hardware" element={<HardwarePage />} />
            <Route path="/pynapse" element={<PynapsePage />} />
            <Route path="/axplorer" element={<AxplorerPage />} />
            <Route path="/roigbiv" element={<RoigbivPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default function App() {
  return (
    <HashRouter>
      <AppShell />
    </HashRouter>
  )
}
