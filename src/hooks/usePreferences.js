import { useState, useEffect } from 'react'

export function useFontLoadStatus() {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    // Check if the browser supports the Font Loading API
    if ("fonts" in document) {
      Promise.all([
        document.fonts.load("1em Inter"),
        document.fonts.load("1em Inter var")
      ]).then(() => {
        setFontsLoaded(true)
      }).catch(() => {
        // Fallback if font loading fails
        console.warn("Font loading failed, using system fonts")
        setFontsLoaded(true)
      })
    } else {
      // Fallback for browsers that don't support the Font Loading API
      setFontsLoaded(true)
    }
  }, [])

  return fontsLoaded
}

export function useSystemTheme() {
  const [systemTheme, setSystemTheme] = useState(() => 
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e) => {
      setSystemTheme(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return systemTheme
}

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return prefersReducedMotion
}
