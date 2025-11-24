import { useState, useCallback } from 'react'

const MAX_HISTORY = 20

export function useHistory(initialState) {
  const [history, setHistory] = useState([initialState])
  const [currentIndex, setCurrentIndex] = useState(0)

  const push = useCallback((state) => {
    setHistory((prev) => {
      const newHistory = prev.slice(0, currentIndex + 1)
      newHistory.push(state)
      if (newHistory.length > MAX_HISTORY) {
        newHistory.shift()
        return newHistory
      }
      return newHistory
    })
    setCurrentIndex((prev) => {
      const newIndex = prev + 1
      return newIndex >= MAX_HISTORY ? MAX_HISTORY - 1 : newIndex
    })
  }, [currentIndex])

  const undo = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }, [])

  const redo = useCallback(() => {
    setCurrentIndex((prev) => Math.min(history.length - 1, prev + 1))
  }, [history.length])

  const canUndo = currentIndex > 0
  const canRedo = currentIndex < history.length - 1
  const state = history[currentIndex]

  return { state, push, undo, redo, canUndo, canRedo }
}
