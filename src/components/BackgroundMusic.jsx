import { useState, useEffect, useRef } from 'react'

// Retro chiptune melody generator using Web Audio API
function createRetroMusic(audioContext) {
  const masterGain = audioContext.createGain()
  masterGain.gain.value = 0.15
  masterGain.connect(audioContext.destination)

  // Simple happy 8-bit melody notes (frequencies in Hz)
  const melody = [
    { note: 523.25, duration: 0.2 },  // C5
    { note: 587.33, duration: 0.2 },  // D5
    { note: 659.25, duration: 0.2 },  // E5
    { note: 523.25, duration: 0.2 },  // C5
    { note: 659.25, duration: 0.3 },  // E5
    { note: 659.25, duration: 0.3 },  // E5
    { note: 587.33, duration: 0.6 },  // D5
    { note: 523.25, duration: 0.2 },  // C5
    { note: 587.33, duration: 0.2 },  // D5
    { note: 659.25, duration: 0.2 },  // E5
    { note: 523.25, duration: 0.2 },  // C5
    { note: 493.88, duration: 0.4 },  // B4
    { note: 440.00, duration: 0.4 },  // A4
    { note: 392.00, duration: 0.4 },  // G4
    { note: 440.00, duration: 0.2 },  // A4
    { note: 493.88, duration: 0.2 },  // B4
    { note: 523.25, duration: 0.4 },  // C5
    { note: 440.00, duration: 0.2 },  // A4
    { note: 523.25, duration: 0.4 },  // C5
    { note: 587.33, duration: 0.4 },  // D5
    { note: 659.25, duration: 0.6 },  // E5
  ]

  // Bass line
  const bass = [
    { note: 130.81, duration: 0.4 },  // C3
    { note: 130.81, duration: 0.4 },  // C3
    { note: 164.81, duration: 0.4 },  // E3
    { note: 164.81, duration: 0.4 },  // E3
    { note: 146.83, duration: 0.4 },  // D3
    { note: 146.83, duration: 0.4 },  // D3
    { note: 196.00, duration: 0.4 },  // G3
    { note: 196.00, duration: 0.4 },  // G3
    { note: 174.61, duration: 0.4 },  // F3
    { note: 174.61, duration: 0.4 },  // F3
    { note: 130.81, duration: 0.8 },  // C3
  ]

  let melodyTime = audioContext.currentTime + 0.1
  let bassTime = audioContext.currentTime + 0.1
  let loopCount = 0
  const maxLoops = 100

  function playNote(freq, startTime, duration, type = 'square', gainNode) {
    const osc = audioContext.createOscillator()
    const noteGain = audioContext.createGain()

    osc.type = type
    osc.frequency.value = freq

    noteGain.gain.setValueAtTime(0.3, startTime)
    noteGain.gain.exponentialRampToValueAtTime(0.01, startTime + duration * 0.9)

    osc.connect(noteGain)
    noteGain.connect(gainNode)

    osc.start(startTime)
    osc.stop(startTime + duration)
  }

  function scheduleMelody() {
    if (loopCount >= maxLoops) return

    melody.forEach(({ note, duration }) => {
      playNote(note, melodyTime, duration, 'square', masterGain)
      melodyTime += duration
    })
    loopCount++

    setTimeout(scheduleMelody, (melodyTime - audioContext.currentTime) * 1000 - 500)
  }

  function scheduleBass() {
    if (loopCount >= maxLoops) return

    bass.forEach(({ note, duration }) => {
      playNote(note, bassTime, duration, 'triangle', masterGain)
      bassTime += duration
    })

    setTimeout(scheduleBass, (bassTime - audioContext.currentTime) * 1000 - 500)
  }

  scheduleMelody()
  scheduleBass()

  return masterGain
}

function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const audioContextRef = useRef(null)
  const gainNodeRef = useRef(null)

  const toggleMusic = () => {
    if (isPlaying) {
      // Stop music
      if (audioContextRef.current) {
        audioContextRef.current.close()
        audioContextRef.current = null
      }
      setIsPlaying(false)
    } else {
      // Start music
      const AudioContext = window.AudioContext || window.webkitAudioContext
      audioContextRef.current = new AudioContext()
      gainNodeRef.current = createRetroMusic(audioContextRef.current)
      gainNodeRef.current.gain.value = volume * 0.5
      setIsPlaying(true)
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = newVolume * 0.5
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  return (
    <div className="music-controls">
      <button
        className={`music-btn ${isPlaying ? 'playing' : ''}`}
        onClick={toggleMusic}
        title={isPlaying ? 'השתק מוזיקה' : 'הפעל מוזיקה'}
      >
        {isPlaying ? '🔊' : '🔇'}
      </button>
      {isPlaying && (
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
          title="עוצמה"
        />
      )}
    </div>
  )
}

export default BackgroundMusic
