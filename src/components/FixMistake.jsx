import { useState } from 'react'

function FixMistake({ sentences, onScore, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedWord, setSelectedWord] = useState(null)
  const [showOptions, setShowOptions] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const currentSentence = sentences[currentIndex]
  const isLastSentence = currentIndex === sentences.length - 1

  const handleWordClick = (wordIndex) => {
    if (showFeedback) return

    if (wordIndex === currentSentence.errorIndex) {
      // Correct word selected
      setSelectedWord(wordIndex)
      setShowOptions(true)
    } else {
      // Wrong word - give hint
      setSelectedWord(wordIndex)
      setTimeout(() => setSelectedWord(null), 500)
    }
  }

  const handleOptionSelect = (option) => {
    const correct = option === currentSentence.correction
    setIsCorrect(correct)
    setShowFeedback(true)
    setShowOptions(false)
    onScore(correct)
  }

  const handleNext = () => {
    if (isLastSentence) {
      onBack()
    } else {
      setCurrentIndex(i => i + 1)
      setSelectedWord(null)
      setShowOptions(false)
      setShowFeedback(false)
      setIsCorrect(false)
    }
  }

  const words = currentSentence.sentence.split(' ')

  return (
    <div className="fix-mode">
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${((currentIndex + 1) / sentences.length) * 100}%` }}
        />
        <span className="progress-text">
          משפט {currentIndex + 1} מתוך {sentences.length}
        </span>
      </div>

      <div className="fix-card">
        <div className="tense-badge">{currentSentence.tense}</div>

        <p className="hebrew-prompt">{currentSentence.hebrewPrompt}</p>
        <p className="fix-instruction">
          {showOptions ? 'בחר את התיקון הנכון:' : 'לחץ על המילה השגויה:'}
        </p>

        <div className="sentence-words" dir="ltr">
          {words.map((word, index) => (
            <button
              key={index}
              className={`word-token ${
                selectedWord === index
                  ? index === currentSentence.errorIndex
                    ? 'error-word'
                    : 'wrong-selection'
                  : ''
              } ${showFeedback && index === currentSentence.errorIndex ? 'highlighted' : ''}`}
              onClick={() => handleWordClick(index)}
              disabled={showOptions || showFeedback}
            >
              {word}
            </button>
          ))}
        </div>

        {showOptions && (
          <div className="fix-options">
            {currentSentence.options.map((option, index) => (
              <button
                key={index}
                className="fix-option-btn"
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {showFeedback && (
          <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? (
              <>
                <span className="feedback-icon">🎉</span>
                <span>מצוין! התיקון נכון!</span>
              </>
            ) : (
              <>
                <span className="feedback-icon">😅</span>
                <span>התיקון הנכון: {currentSentence.correction}</span>
              </>
            )}
          </div>
        )}

        {showFeedback && (
          <div className="corrected-sentence" dir="ltr">
            <strong>המשפט המתוקן:</strong> {currentSentence.correctedSentence}
          </div>
        )}

        {showFeedback && (
          <button className="next-btn" onClick={handleNext}>
            {isLastSentence ? '🏠 חזרה לתפריט' : 'הבא ➡️'}
          </button>
        )}
      </div>

      <button className="back-btn" onClick={onBack}>
        ← חזרה לתפריט
      </button>
    </div>
  )
}

export default FixMistake
