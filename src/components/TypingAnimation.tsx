'use client'

import { useEffect, useState } from 'react'

interface TypingAnimationProps {
  text: string
  delay?: number
  speed?: number
  className?: string
}

export default function TypingAnimation({ 
  text, 
  delay = 0, 
  speed = 50, 
  className = '' 
}: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState('')
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      let index = 0
      const interval = setInterval(() => {
        if (index <= text.length) {
          setDisplayText(text.slice(0, index))
          index++
        } else {
          clearInterval(interval)
          setShowCursor(false)
        }
      }, speed)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timer)
  }, [text, delay, speed])

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <span className="animate-pulse text-terminal-text">|</span>
      )}
    </span>
  )
}
