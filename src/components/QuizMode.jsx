import { useState } from 'react'
import { speakEnglish } from '../utils/speech'

function QuizMode({ questions, onScore, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const currentQuestion = questions[currentIndex]
  const isCorrect = selectedAnswer === currentQuestion.correct
  const isLastQuestion = currentIndex === questions.length - 1

  const handleSelect = (index) => {
    if (showFeedback) return // Already answered
    setSelectedAnswer(index)
    setShowFeedback(true)
    const correct = index === currentQuestion.correct
    onScore(correct)

    // Speak the sentence on correct answer
    if (correct) {
      const sentence = currentQuestion.englishSentence.replace('___', currentQuestion.options[currentQuestion.correct])
      setTimeout(() => speakEnglish(sentence), 300)
    }
  }

  const handleNext = () => {
    if (isLastQuestion) {
      onBack()
    } else {
      setCurrentIndex(i => i + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
      setShowHint(false)
    }
  }

  return (
    <div className="quiz-mode">
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
        <span className="progress-text">
          שאלה {currentIndex + 1} מתוך {questions.length}
        </span>
      </div>

      <div className="question-card">
        <div className="tense-badge">{currentQuestion.tense}</div>

        <p className="hebrew-prompt">{currentQuestion.hebrewPrompt}</p>
        <p className="english-sentence" dir="ltr">{currentQuestion.englishSentence}</p>

        {!showFeedback && !showHint && (
          <button className="hint-btn" onClick={() => setShowHint(true)}>
            💡 רמז
          </button>
        )}

        {showHint && !showFeedback && (
          <div className="hint-box">
            {currentQuestion.hebrewHint}
          </div>
        )}

        <div className="options-grid">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`option-btn ${
                showFeedback
                  ? index === currentQuestion.correct
                    ? 'correct'
                    : index === selectedAnswer
                    ? 'incorrect'
                    : ''
                  : ''
              } ${selectedAnswer === index ? 'selected' : ''}`}
              onClick={() => handleSelect(index)}
              disabled={showFeedback}
            >
              {option}
            </button>
          ))}
        </div>

        {showFeedback && (
          <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? (
              <>
                <span className="feedback-icon">🎉</span>
                <span>מצוין! תשובה נכונה!</span>
              </>
            ) : (
              <>
                <span className="feedback-icon">😅</span>
                <span>לא נורא! התשובה הנכונה היא: {currentQuestion.options[currentQuestion.correct]}</span>
              </>
            )}
          </div>
        )}

        {showFeedback && (
          <button className="next-btn" onClick={handleNext}>
            {isLastQuestion ? '🏠 חזרה לתפריט' : 'הבא ➡️'}
          </button>
        )}
      </div>

      <button className="back-btn" onClick={onBack}>
        ← חזרה לתפריט
      </button>
    </div>
  )
}

export default QuizMode
