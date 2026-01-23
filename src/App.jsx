import { useState } from 'react'
import QuizMode from './components/QuizMode'
import DragDropMode from './components/DragDropMode'
import './App.css'

// Sample grammar content - HARDCODED for prototype
const quizQuestions = [
  {
    id: 1,
    hebrewPrompt: 'בחר את הפועל הנכון: הוא ___ כדורגל עכשיו',
    englishSentence: 'He ___ football now.',
    options: ['plays', 'is playing', 'play', 'playing'],
    correct: 1, // index of correct answer
    tense: 'Present Progressive',
    hebrewHint: 'רמז: המילה "עכשיו" מרמזת על פעולה שקורה ברגע זה'
  },
  {
    id: 2,
    hebrewPrompt: 'בחר את הפועל הנכון: היא ___ לבית הספר כל יום',
    englishSentence: 'She ___ to school every day.',
    options: ['is walking', 'walk', 'walks', 'walking'],
    correct: 2,
    tense: 'Present Simple',
    hebrewHint: 'רמז: "כל יום" מתאר פעולה שחוזרת על עצמה'
  },
  {
    id: 3,
    hebrewPrompt: 'בחר את הפועל הנכון: הם ___ טלוויזיה עכשיו',
    englishSentence: 'They ___ TV right now.',
    options: ['watch', 'watches', 'are watching', 'watching'],
    correct: 2,
    tense: 'Present Progressive',
    hebrewHint: 'רמז: "עכשיו" = פעולה שמתרחשת ברגע זה'
  },
  {
    id: 4,
    hebrewPrompt: 'בחר את הפועל הנכון: אני ___ ספרים',
    englishSentence: 'I ___ books.',
    options: ['am liking', 'likes', 'like', 'liking'],
    correct: 2,
    tense: 'Present Simple',
    hebrewHint: 'רמז: פעלי רגש כמו "like" לא משתמשים בצורת ing'
  }
]

const dragDropSentences = [
  {
    id: 1,
    hebrewPrompt: 'סדר את המילים למשפט נכון',
    words: ['She', 'is', 'reading', 'a', 'book'],
    correctOrder: [0, 1, 2, 3, 4],
    tense: 'Present Progressive'
  },
  {
    id: 2,
    hebrewPrompt: 'סדר את המילים למשפט נכון',
    words: ['They', 'play', 'football', 'every', 'day'],
    correctOrder: [0, 1, 2, 3, 4],
    tense: 'Present Simple'
  },
  {
    id: 3,
    hebrewPrompt: 'סדר את המילים למשפט נכון',
    words: ['am', 'I', 'eating', 'lunch'],
    correctOrder: [1, 0, 2, 3], // I am eating lunch
    tense: 'Present Progressive'
  }
]

function App() {
  const [mode, setMode] = useState('menu') // menu, quiz, dragdrop
  const [score, setScore] = useState(0)
  const [totalAnswered, setTotalAnswered] = useState(0)

  const handleScore = (isCorrect) => {
    if (isCorrect) setScore(s => s + 1)
    setTotalAnswered(t => t + 1)
  }

  const resetGame = () => {
    setScore(0)
    setTotalAnswered(0)
    setMode('menu')
  }

  return (
    <div className="app" dir="rtl">
      <header className="app-header">
        <h1>🎓 English4U</h1>
        <p className="subtitle">לומדים אנגלית בכיף!</p>
        {mode !== 'menu' && (
          <div className="score-display">
            ניקוד: {score}/{totalAnswered}
          </div>
        )}
      </header>

      <main className="app-main">
        {mode === 'menu' && (
          <div className="menu">
            <h2>בחר סוג תרגיל:</h2>
            <button
              className="menu-btn quiz-btn"
              onClick={() => setMode('quiz')}
            >
              📝 חידון בחירה
              <span className="btn-desc">בחר את התשובה הנכונה</span>
            </button>
            <button
              className="menu-btn drag-btn"
              onClick={() => setMode('dragdrop')}
            >
              🧩 בניית משפטים
              <span className="btn-desc">גרור מילים לסדר נכון</span>
            </button>
          </div>
        )}

        {mode === 'quiz' && (
          <QuizMode
            questions={quizQuestions}
            onScore={handleScore}
            onBack={resetGame}
          />
        )}

        {mode === 'dragdrop' && (
          <DragDropMode
            sentences={dragDropSentences}
            onScore={handleScore}
            onBack={resetGame}
          />
        )}
      </main>
    </div>
  )
}

export default App
