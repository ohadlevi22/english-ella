import { useState, useEffect } from 'react'
import { speakEnglish } from '../utils/speech'

function MemoryMatch({ pairs, onScore, onBack }) {
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)

  // Initialize cards on mount
  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    // Create card pairs and shuffle
    const cardPairs = pairs.flatMap((pair, index) => [
      { id: index * 2, pairId: index, content: pair.a, type: 'a' },
      { id: index * 2 + 1, pairId: index, content: pair.b, type: 'b' }
    ])
    setCards(shuffleArray(cardPairs))
    setFlipped([])
    setMatched([])
    setMoves(0)
    setGameComplete(false)
  }

  const handleCardClick = (cardId) => {
    // Ignore if already flipped or matched
    if (flipped.includes(cardId) || matched.includes(cardId)) return
    // Ignore if two cards already flipped
    if (flipped.length === 2) return

    const newFlipped = [...flipped, cardId]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setMoves(m => m + 1)

      const [first, second] = newFlipped
      const firstCard = cards.find(c => c.id === first)
      const secondCard = cards.find(c => c.id === second)

      if (firstCard.pairId === secondCard.pairId && firstCard.type !== secondCard.type) {
        // Match found!
        const newMatched = [...matched, first, second]
        setMatched(newMatched)
        setFlipped([])
        onScore(true)

        // Speak the verb pair
        const pair = pairs[firstCard.pairId]
        setTimeout(() => speakEnglish(`${pair.a}, ${pair.b}`), 300)

        // Check if game complete
        if (newMatched.length === cards.length) {
          setGameComplete(true)
        }
      } else {
        // No match - flip back after delay
        setTimeout(() => {
          setFlipped([])
        }, 1000)
      }
    }
  }

  const isFlipped = (cardId) => flipped.includes(cardId) || matched.includes(cardId)
  const isMatched = (cardId) => matched.includes(cardId)

  return (
    <div className="memory-mode">
      <div className="game-stats">
        <span className="stat">מהלכים: {moves}</span>
        <span className="stat">התאמות: {matched.length / 2}/{pairs.length}</span>
      </div>

      {gameComplete ? (
        <div className="game-complete">
          <h2>🎉 כל הכבוד!</h2>
          <p>סיימת את המשחק ב-{moves} מהלכים!</p>
          <div className="complete-actions">
            <button className="play-again-btn" onClick={initializeGame}>
              🔄 שחק שוב
            </button>
            <button className="back-btn" onClick={onBack}>
              ← חזרה לתפריט
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="memory-instruction">מצא את הזוגות המתאימים</p>
          <div className="memory-grid">
            {cards.map(card => (
              <button
                key={card.id}
                className={`memory-card ${isFlipped(card.id) ? 'flipped' : ''} ${isMatched(card.id) ? 'matched' : ''}`}
                onClick={() => handleCardClick(card.id)}
                disabled={isMatched(card.id)}
              >
                <div className="card-inner">
                  <div className="card-front">?</div>
                  <div className="card-back">{card.content}</div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {!gameComplete && (
        <button className="back-btn" onClick={onBack}>
          ← חזרה לתפריט
        </button>
      )}
    </div>
  )
}

function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default MemoryMatch
