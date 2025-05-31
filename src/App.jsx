import { useState } from 'react'
import './App.css'
import './styles/About.css'
import Header from './components/Header'
import WorkExperience from './components/WorkExperience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    // LocalStorageに設定を保存
    localStorage.setItem('darkMode', String(!darkMode))
  }

  // 初期ロード時にLocalStorageから設定を読み込む
  useState(() => {
    const savedDarkMode = localStorage.getItem('darkMode')
    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode === 'true')
    } else {
      // システムの設定を確認
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setDarkMode(prefersDark)
    }
  }, [])

  return (
    <div 
      className={`App ${darkMode ? 'dark' : ''}`}
      role="application"
      aria-label="tawashiのポートフォリオ"
    >
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main 
        id="main"
        className="main"
        role="main"
        tabIndex="-1"
      >
        <WorkExperience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App