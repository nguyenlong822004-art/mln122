import { useState, useEffect } from 'react'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import AnimatedBackground from './components/AnimatedBackground'
import Section111 from './components/Section111'
import Section112 from './components/Section112'
import Section113 from './components/Section113'
import Section114 from './components/Section114'
import Section115 from './components/Section115'
import Section116 from './components/Section116'
import Section12 from './components/Section12'
import ChapterQuiz from './components/ChapterQuiz'
import { parentSection } from './data/section112'
import { section12Info } from './data/section12'
import { chapter11QuizQuestions, chapter11QuizMeta } from './data/chapter11Quiz'

export default function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [pageKey, setPageKey] = useState('home')
  const [pageVisible, setPageVisible] = useState(true)

  function handleTabChange(tab) {
    if (tab === activeTab) return
    setPageVisible(false)
    setTimeout(() => {
      setActiveTab(tab)
      setPageKey(tab)
      setPageVisible(true)
    }, 180)
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeTab])

  function renderContent() {
    switch (activeTab) {
      case 'home':
        return <Hero onStart={handleTabChange} />
      case 'section111':
        return <Section111 />
      case 'section112':
        return <Section112 />
      case 'section113':
        return <Section113 />
      case 'section114':
        return <Section114 />
      case 'section115':
        return <Section115 />
      case 'section116':
        return <Section116 />
      case 'quiz11':
        return (
          <ChapterQuiz
            questions={chapter11QuizQuestions}
            title={`❓ ${chapter11QuizMeta.title}`}
            description={chapter11QuizMeta.description}
            excellent={chapter11QuizMeta.excellent}
            good={chapter11QuizMeta.good}
            needsWork={chapter11QuizMeta.needsWork}
          />
        )
      case 'section12':
        return <Section12 />
      default:
        return <Hero onStart={handleTabChange} />
    }
  }

  return (
    <div className="app">
      <AnimatedBackground />
      <Header />
      <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
      <main
        key={pageKey}
        className={`main-content page-transition ${pageVisible ? 'page-visible' : 'page-hidden'}`}
      >
        {renderContent()}
      </main>
      <footer className="site-footer">
        <p>MLN122 · {parentSection} · {section12Info.section}</p>
      </footer>
    </div>
  )
}
