'use client'

import { useState, useEffect } from 'react'

const MouseFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHoveringLink, setIsHoveringLink] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      // Mouse'un bir link veya buton üzerinde olup olmadığını kontrol et
      const target = e.target as HTMLElement
      if (
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHoveringLink(true)
      } else {
        setIsHoveringLink(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Component kaldırıldığında event listener'ı temizle
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const followerClasses = `
    mouse-follower
    ${isHoveringLink ? 'hovering-link' : ''}
  `

  return (
    <div
      className={followerClasses}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    />
  )
}

export default MouseFollower
