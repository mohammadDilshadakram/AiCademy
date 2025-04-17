import React from 'react'
import ReactCardFlip from 'react-card-flip'
import './style.css'

function Flashcarditem({isFlipped,handleClick,flashcard}) {
  return (
    <div className="flip-container">
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <div
        className="flip-card front"
        onClick={handleClick}
      >
        <h2>{flashcard?.front}</h2>
      </div>
  
      <div
        className="flip-card back"
        onClick={handleClick}
      >
        <h2>{flashcard?.back}</h2>
      </div>
    </ReactCardFlip>
  </div>
  )
}

export default Flashcarditem