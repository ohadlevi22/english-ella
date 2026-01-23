import { useState } from 'react'

function DragDropMode({ sentences, onScore, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [availableWords, setAvailableWords] = useState(
    shuffleArray([...sentences[0].words.map((w, i) => ({ word: w, originalIndex: i }))])
  )
  const [builtSentence, setBuiltSentence] = useState([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [draggedWord, setDraggedWord] = useState(null)

  const currentSentence = sentences[currentIndex]
  const isLastSentence = currentIndex === sentences.length - 1

  // Check if the built sentence matches the correct order
  const checkAnswer = () => {
    const builtOrder = builtSentence.map(w => w.originalIndex)
    const isCorrect = builtOrder.length === currentSentence.correctOrder.length &&
      builtOrder.every((val, idx) => val === currentSentence.correctOrder[idx])

    onScore(isCorrect)
    setShowFeedback(true)
    return isCorrect
  }

  const isCorrect = showFeedback &&
    builtSentence.map(w => w.originalIndex).every((val, idx) => val === currentSentence.correctOrder[idx])

  // Drag handlers for desktop
  const handleDragStart = (e, word, fromBuilt = false) => {
    setDraggedWord({ ...word, fromBuilt })
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDropToSentence = (e) => {
    e.preventDefault()
    if (!draggedWord || showFeedback) return

    if (!draggedWord.fromBuilt) {
      // Moving from available to built
      setBuiltSentence([...builtSentence, draggedWord])
      setAvailableWords(availableWords.filter(w => w.originalIndex !== draggedWord.originalIndex))
    }
    setDraggedWord(null)
  }

  const handleDropToAvailable = (e) => {
    e.preventDefault()
    if (!draggedWord || showFeedback) return

    if (draggedWord.fromBuilt) {
      // Moving from built back to available
      setAvailableWords([...availableWords, draggedWord])
      setBuiltSentence(builtSentence.filter(w => w.originalIndex !== draggedWord.originalIndex))
    }
    setDraggedWord(null)
  }

  // Touch/Click handlers (for mobile)
  const handleWordClick = (word, fromBuilt = false) => {
    if (showFeedback) return

    if (fromBuilt) {
      // Remove from built, add back to available
      setBuiltSentence(builtSentence.filter(w => w.originalIndex !== word.originalIndex))
      setAvailableWords([...availableWords, word])
    } else {
      // Add to built, remove from available
      setBuiltSentence([...builtSentence, word])
      setAvailableWords(availableWords.filter(w => w.originalIndex !== word.originalIndex))
    }
  }

  const handleNext = () => {
    if (isLastSentence) {
      onBack()
    } else {
      const nextSentence = sentences[currentIndex + 1]
      setCurrentIndex(i => i + 1)
      setAvailableWords(shuffleArray([...nextSentence.words.map((w, i) => ({ word: w, originalIndex: i }))]))
      setBuiltSentence([])
      setShowFeedback(false)
    }
  }

  const handleReset = () => {
    setAvailableWords(shuffleArray([...currentSentence.words.map((w, i) => ({ word: w, originalIndex: i }))]))
    setBuiltSentence([])
    setShowFeedback(false)
  }

  return (
    <div className="dragdrop-mode">
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${((currentIndex + 1) / sentences.length) * 100}%` }}
        />
        <span className="progress-text">
          משפט {currentIndex + 1} מתוך {sentences.length}
        </span>
      </div>

      <div className="sentence-card">
        <div className="tense-badge">{currentSentence.tense}</div>

        <p className="hebrew-prompt">{currentSentence.hebrewPrompt}</p>
        <p className="instruction-text">לחץ על מילה כדי להוסיף אותה למשפט (או גרור)</p>

        {/* Drop zone for built sentence */}
        <div
          className={`sentence-builder ${showFeedback ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
          onDragOver={handleDragOver}
          onDrop={handleDropToSentence}
          dir="ltr"
        >
          {builtSentence.length === 0 ? (
            <span className="placeholder">גרור מילים לכאן...</span>
          ) : (
            builtSentence.map((wordObj, index) => (
              <span
                key={wordObj.originalIndex}
                className="built-word"
                draggable={!showFeedback}
                onDragStart={(e) => handleDragStart(e, wordObj, true)}
                onClick={() => handleWordClick(wordObj, true)}
              >
                {wordObj.word}
              </span>
            ))
          )}
        </div>

        {/* Available words */}
        <div
          className="available-words"
          onDragOver={handleDragOver}
          onDrop={handleDropToAvailable}
        >
          {availableWords.map((wordObj) => (
            <button
              key={wordObj.originalIndex}
              className="word-btn"
              draggable={!showFeedback}
              onDragStart={(e) => handleDragStart(e, wordObj, false)}
              onClick={() => handleWordClick(wordObj, false)}
              disabled={showFeedback}
            >
              {wordObj.word}
            </button>
          ))}
        </div>

        {!showFeedback && builtSentence.length === currentSentence.words.length && (
          <button className="check-btn" onClick={checkAnswer}>
            ✓ בדוק תשובה
          </button>
        )}

        {showFeedback && (
          <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? (
              <>
                <span className="feedback-icon">🎉</span>
                <span>מעולה! המשפט נכון!</span>
              </>
            ) : (
              <>
                <span className="feedback-icon">😅</span>
                <span>כמעט! המשפט הנכון: {currentSentence.correctOrder.map(i => currentSentence.words[i]).join(' ')}</span>
              </>
            )}
          </div>
        )}

        <div className="action-buttons">
          {!showFeedback && (
            <button className="reset-btn" onClick={handleReset}>
              🔄 התחל מחדש
            </button>
          )}
          {showFeedback && (
            <button className="next-btn" onClick={handleNext}>
              {isLastSentence ? '🏠 חזרה לתפריט' : 'הבא ➡️'}
            </button>
          )}
        </div>
      </div>

      <button className="back-btn" onClick={onBack}>
        ← חזרה לתפריט
      </button>
    </div>
  )
}

// Fisher-Yates shuffle
function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default DragDropMode
