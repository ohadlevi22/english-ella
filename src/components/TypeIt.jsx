import { useState, useRef, useEffect } from 'react'

function TypeIt({ questions, onScore, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const inputRef = useRef(null)

  const currentQuestion = questions[currentIndex]
  const isLastQuestion = currentIndex === questions.length - 1

  useEffect(() => {
    // Focus input when question changes
    if (inputRef.current && !showFeedback) {
      inputRef.current.focus()
    }
  }, [currentIndex, showFeedback])

  const normalizeAnswer = (str) => {
    return str.toLowerCase().trim().replace(/\s+/g, ' ')
  }

  const checkAnswer = () => {
    const userAnswer = normalizeAnswer(userInput)
    const correctAnswers = currentQuestion.acceptedAnswers.map(normalizeAnswer)
    const correct = correctAnswers.includes(userAnswer)

    setIsCorrect(correct)
    setShowFeedback(true)
    onScore(correct)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && userInput.trim()) {
      checkAnswer()
    }
  }

  const handleNext = () => {
    if (isLastQuestion) {
      onBack()
    } else {
      setCurrentIndex(i => i + 1)
      setUserInput('')
      setShowFeedback(false)
      setIsCorrect(false)
      setShowHint(false)
    }
  }

  return (
    <div className="type-mode">
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
        <span className="progress-text">
          שאלה {currentIndex + 1} מתוך {questions.length}
        </span>
      </div>

      <div className="type-card">
        <div className="tense-badge">{currentQuestion.tense}</div>

        <p className="hebrew-prompt">{currentQuestion.hebrewPrompt}</p>

        <div className="verb-hint">
          <span className="verb-label">הפועל:</span>
          <span className="verb-base">{currentQuestion.baseVerb}</span>
        </div>

        <div className="english-sentence-type" dir="ltr">
          {currentQuestion.sentenceBefore}
          <span className="blank-space">
            {showFeedback ? (
              <span className={isCorrect ? 'correct-answer' : 'wrong-answer'}>
                {userInput || '___'}
              </span>
            ) : (
              '___'
            )}
          </span>
          {currentQuestion.sentenceAfter}
        </div>

        {!showFeedback && (
          <>
            {!showHint && (
              <button className="hint-btn" onClick={() => setShowHint(true)}>
                💡 רמז
              </button>
            )}

            {showHint && (
              <div className="hint-box">
                {currentQuestion.hint}
              </div>
            )}

            <div className="type-input-container">
              <input
                ref={inputRef}
                type="text"
                className="type-input"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="הקלד את התשובה..."
                dir="ltr"
                autoComplete="off"
                autoCapitalize="off"
              />
              <button
                className="check-btn"
                onClick={checkAnswer}
                disabled={!userInput.trim()}
              >
                ✓ בדוק
              </button>
            </div>
          </>
        )}

        {showFeedback && (
          <>
            <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
              {isCorrect ? (
                <>
                  <span className="feedback-icon">🎉</span>
                  <span>מצוין! התשובה נכונה!</span>
                </>
              ) : (
                <>
                  <span className="feedback-icon">😅</span>
                  <span>התשובה הנכונה: {currentQuestion.acceptedAnswers[0]}</span>
                </>
              )}
            </div>

            <div className="full-sentence" dir="ltr">
              <strong>המשפט המלא:</strong> {currentQuestion.fullSentence}
            </div>

            <button className="next-btn" onClick={handleNext}>
              {isLastQuestion ? '🏠 חזרה לתפריט' : 'הבא ➡️'}
            </button>
          </>
        )}
      </div>

      <button className="back-btn" onClick={onBack}>
        ← חזרה לתפריט
      </button>
    </div>
  )
}

export default TypeIt
