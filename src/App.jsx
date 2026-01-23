import { useState } from 'react'
import QuizMode from './components/QuizMode'
import DragDropMode from './components/DragDropMode'
import './App.css'

// Grammar content for 4th grade Israeli students
const quizQuestions = [
  // Present Progressive questions
  {
    id: 1,
    hebrewPrompt: 'בחר את הפועל הנכון: הוא ___ כדורגל עכשיו',
    englishSentence: 'He ___ football now.',
    options: ['plays', 'is playing', 'play', 'playing'],
    correct: 1,
    tense: 'Present Progressive',
    hebrewHint: 'רמז: המילה "עכשיו" (now) מרמזת על פעולה שקורה ברגע זה'
  },
  {
    id: 2,
    hebrewPrompt: 'בחר את הפועל הנכון: הם ___ טלוויזיה עכשיו',
    englishSentence: 'They ___ TV right now.',
    options: ['watch', 'watches', 'are watching', 'watching'],
    correct: 2,
    tense: 'Present Progressive',
    hebrewHint: 'רמז: "right now" = עכשיו ממש, פעולה שמתרחשת ברגע זה'
  },
  {
    id: 3,
    hebrewPrompt: 'בחר את הפועל הנכון: אמא ___ עוגה במטבח',
    englishSentence: 'Mom ___ a cake in the kitchen.',
    options: ['bakes', 'is baking', 'bake', 'baking'],
    correct: 1,
    tense: 'Present Progressive',
    hebrewHint: 'רמז: אמא עושה את זה עכשיו, ברגע זה'
  },
  {
    id: 4,
    hebrewPrompt: 'בחר את הפועל הנכון: הילדים ___ בפארק עכשיו',
    englishSentence: 'The children ___ in the park now.',
    options: ['play', 'plays', 'are playing', 'is playing'],
    correct: 2,
    tense: 'Present Progressive',
    hebrewHint: 'רמז: "children" זה רבים, אז צריך "are" + פועל עם ing'
  },
  {
    id: 5,
    hebrewPrompt: 'בחר את הפועל הנכון: אני ___ שיעורי בית עכשיו',
    englishSentence: 'I ___ my homework now.',
    options: ['do', 'does', 'am doing', 'is doing'],
    correct: 2,
    tense: 'Present Progressive',
    hebrewHint: 'רמז: עם "I" משתמשים ב-"am" + פועל עם ing'
  },
  {
    id: 6,
    hebrewPrompt: 'בחר את הפועל הנכון: הכלב ___ בגינה עכשיו',
    englishSentence: 'The dog ___ in the garden now.',
    options: ['run', 'runs', 'is running', 'are running'],
    correct: 2,
    tense: 'Present Progressive',
    hebrewHint: 'רמז: כלב אחד = יחיד, אז "is" + פועל עם ing'
  },
  {
    id: 7,
    hebrewPrompt: 'בחר את הפועל הנכון: התלמידים ___ לשיעור עכשיו',
    englishSentence: 'The students ___ to the lesson now.',
    options: ['listen', 'listens', 'is listening', 'are listening'],
    correct: 3,
    tense: 'Present Progressive',
    hebrewHint: 'רמז: תלמידים = רבים, אז "are" + פועל עם ing'
  },
  // Present Simple questions
  {
    id: 8,
    hebrewPrompt: 'בחר את הפועל הנכון: היא ___ לבית הספר כל יום',
    englishSentence: 'She ___ to school every day.',
    options: ['is walking', 'walk', 'walks', 'walking'],
    correct: 2,
    tense: 'Present Simple',
    hebrewHint: 'רמז: "every day" = כל יום, פעולה שחוזרת על עצמה'
  },
  {
    id: 9,
    hebrewPrompt: 'בחר את הפועל הנכון: אני ___ ספרים',
    englishSentence: 'I ___ books.',
    options: ['am liking', 'likes', 'like', 'liking'],
    correct: 2,
    tense: 'Present Simple',
    hebrewHint: 'רמז: פעלי רגש כמו "like" לא משתמשים בצורת ing'
  },
  {
    id: 10,
    hebrewPrompt: 'בחר את הפועל הנכון: הוא ___ קפה כל בוקר',
    englishSentence: 'He ___ coffee every morning.',
    options: ['drink', 'drinks', 'is drinking', 'drinking'],
    correct: 1,
    tense: 'Present Simple',
    hebrewHint: 'רמז: "every morning" = כל בוקר, הרגל קבוע'
  },
  {
    id: 11,
    hebrewPrompt: 'בחר את הפועל הנכון: החתול ___ הרבה',
    englishSentence: 'The cat ___ a lot.',
    options: ['sleep', 'sleeps', 'is sleeping', 'sleeping'],
    correct: 1,
    tense: 'Present Simple',
    hebrewHint: 'רמז: זה תיאור כללי של החתול, לא פעולה שקורה עכשיו'
  },
  {
    id: 12,
    hebrewPrompt: 'בחר את הפועל הנכון: אנחנו ___ אנגלית בבית הספר',
    englishSentence: 'We ___ English at school.',
    options: ['learn', 'learns', 'are learning', 'is learning'],
    correct: 0,
    tense: 'Present Simple',
    hebrewHint: 'רמז: זה מה שאנחנו עושים באופן קבוע בבית הספר'
  },
  {
    id: 13,
    hebrewPrompt: 'בחר את הפועל הנכון: השמש ___ במזרח',
    englishSentence: 'The sun ___ in the east.',
    options: ['rise', 'rises', 'is rising', 'rising'],
    correct: 1,
    tense: 'Present Simple',
    hebrewHint: 'רמז: זו עובדה שתמיד נכונה, לא פעולה זמנית'
  },
  {
    id: 14,
    hebrewPrompt: 'בחר את הפועל הנכון: הם ___ פיצה בכל שבת',
    englishSentence: 'They ___ pizza every Saturday.',
    options: ['eat', 'eats', 'are eating', 'eating'],
    correct: 0,
    tense: 'Present Simple',
    hebrewHint: 'רמז: "every Saturday" = פעולה שחוזרת על עצמה'
  },
  {
    id: 15,
    hebrewPrompt: 'בחר את הפועל הנכון: אבא שלי ___ במשרד',
    englishSentence: 'My dad ___ in an office.',
    options: ['work', 'works', 'is working', 'working'],
    correct: 1,
    tense: 'Present Simple',
    hebrewHint: 'רמז: זו העבודה הקבועה שלו, לא מה שהוא עושה עכשיו'
  },
  {
    id: 16,
    hebrewPrompt: 'בחר את הפועל הנכון: מים ___ ב-100 מעלות',
    englishSentence: 'Water ___ at 100 degrees.',
    options: ['boil', 'boils', 'is boiling', 'boiling'],
    correct: 1,
    tense: 'Present Simple',
    hebrewHint: 'רמז: זו עובדה מדעית שתמיד נכונה'
  },
  // Mixed - tricky questions
  {
    id: 17,
    hebrewPrompt: 'בחר את הפועל הנכון: שקט! התינוק ___',
    englishSentence: 'Quiet! The baby ___.',
    options: ['sleeps', 'sleep', 'is sleeping', 'sleeping'],
    correct: 2,
    tense: 'Present Progressive',
    hebrewHint: 'רמז: "שקט!" מרמז שזה קורה עכשיו ברגע זה'
  },
  {
    id: 18,
    hebrewPrompt: 'בחר את הפועל הנכון: היא תמיד ___ מוקדם',
    englishSentence: 'She always ___ up early.',
    options: ['wake', 'wakes', 'is waking', 'waking'],
    correct: 1,
    tense: 'Present Simple',
    hebrewHint: 'רמז: "always" = תמיד, מתאר הרגל קבוע'
  },
  {
    id: 19,
    hebrewPrompt: 'בחר את הפועל הנכון: תראה! הציפור ___',
    englishSentence: 'Look! The bird ___.',
    options: ['fly', 'flies', 'is flying', 'flying'],
    correct: 2,
    tense: 'Present Progressive',
    hebrewHint: 'רמז: "Look!" (תראה) מרמז על משהו שקורה עכשיו'
  },
  {
    id: 20,
    hebrewPrompt: 'בחר את הפועל הנכון: אני לא ___ בשר',
    englishSentence: "I don't ___ meat.",
    options: ['eat', 'eats', 'eating', 'am eating'],
    correct: 0,
    tense: 'Present Simple',
    hebrewHint: 'רמז: זה מתאר העדפה קבועה, לא פעולה זמנית'
  }
]

const dragDropSentences = [
  // Present Progressive sentences
  {
    id: 1,
    hebrewPrompt: 'סדר את המילים למשפט: היא קוראת ספר',
    words: ['She', 'is', 'reading', 'a', 'book'],
    correctOrder: [0, 1, 2, 3, 4],
    tense: 'Present Progressive'
  },
  {
    id: 2,
    hebrewPrompt: 'סדר את המילים למשפט: אני אוכל ארוחת צהריים',
    words: ['eating', 'I', 'am', 'lunch'],
    correctOrder: [1, 2, 0, 3], // I am eating lunch
    tense: 'Present Progressive'
  },
  {
    id: 3,
    hebrewPrompt: 'סדר את המילים למשפט: הם משחקים כדורסל',
    words: ['playing', 'They', 'basketball', 'are'],
    correctOrder: [1, 3, 0, 2], // They are playing basketball
    tense: 'Present Progressive'
  },
  {
    id: 4,
    hebrewPrompt: 'סדר את המילים למשפט: הכלב רץ בפארק',
    words: ['running', 'The', 'dog', 'is', 'in', 'the', 'park'],
    correctOrder: [1, 2, 3, 0, 4, 5, 6], // The dog is running in the park
    tense: 'Present Progressive'
  },
  {
    id: 5,
    hebrewPrompt: 'סדר את המילים למשפט: אמא מבשלת ארוחת ערב',
    words: ['Mom', 'cooking', 'dinner', 'is'],
    correctOrder: [0, 3, 1, 2], // Mom is cooking dinner
    tense: 'Present Progressive'
  },
  {
    id: 6,
    hebrewPrompt: 'סדר את המילים למשפט: הילדים צופים בטלוויזיה',
    words: ['watching', 'The', 'children', 'TV', 'are'],
    correctOrder: [1, 2, 4, 0, 3], // The children are watching TV
    tense: 'Present Progressive'
  },
  {
    id: 7,
    hebrewPrompt: 'סדר את המילים למשפט: אני כותב את שיעורי הבית',
    words: ['my', 'am', 'homework', 'writing', 'I'],
    correctOrder: [4, 1, 3, 0, 2], // I am writing my homework
    tense: 'Present Progressive'
  },
  // Present Simple sentences
  {
    id: 8,
    hebrewPrompt: 'סדר את המילים למשפט: הם משחקים כדורגל כל יום',
    words: ['They', 'play', 'football', 'every', 'day'],
    correctOrder: [0, 1, 2, 3, 4],
    tense: 'Present Simple'
  },
  {
    id: 9,
    hebrewPrompt: 'סדר את המילים למשפט: היא הולכת לבית הספר',
    words: ['goes', 'She', 'school', 'to'],
    correctOrder: [1, 0, 3, 2], // She goes to school
    tense: 'Present Simple'
  },
  {
    id: 10,
    hebrewPrompt: 'סדר את המילים למשפט: אני אוהב גלידה',
    words: ['I', 'ice cream', 'like'],
    correctOrder: [0, 2, 1], // I like ice cream
    tense: 'Present Simple'
  },
  {
    id: 11,
    hebrewPrompt: 'סדר את המילים למשפט: הוא שותה חלב כל בוקר',
    words: ['drinks', 'He', 'milk', 'every', 'morning'],
    correctOrder: [1, 0, 2, 3, 4], // He drinks milk every morning
    tense: 'Present Simple'
  },
  {
    id: 12,
    hebrewPrompt: 'סדר את המילים למשפט: החתול ישן על המיטה',
    words: ['on', 'The', 'sleeps', 'cat', 'the', 'bed'],
    correctOrder: [1, 3, 2, 0, 4, 5], // The cat sleeps on the bed
    tense: 'Present Simple'
  },
  {
    id: 13,
    hebrewPrompt: 'סדר את המילים למשפט: אנחנו לומדים אנגלית',
    words: ['learn', 'We', 'English'],
    correctOrder: [1, 0, 2], // We learn English
    tense: 'Present Simple'
  },
  {
    id: 14,
    hebrewPrompt: 'סדר את המילים למשפט: השמש זורחת במזרח',
    words: ['rises', 'in', 'The', 'sun', 'the', 'east'],
    correctOrder: [2, 3, 0, 1, 4, 5], // The sun rises in the east
    tense: 'Present Simple'
  },
  {
    id: 15,
    hebrewPrompt: 'סדר את המילים למשפט: אבא עובד במשרד',
    words: ['works', 'Dad', 'an', 'office', 'in'],
    correctOrder: [1, 0, 4, 2, 3], // Dad works in an office
    tense: 'Present Simple'
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
