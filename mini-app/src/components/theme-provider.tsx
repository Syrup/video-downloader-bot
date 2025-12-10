import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  // Fix: Proper system theme detection on initial load
  const getSystemTheme = (): "light" | "dark" => {
    if (typeof window === 'undefined') return 'light'
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }

  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return defaultTheme
    const stored = localStorage.getItem(storageKey) as Theme
    return stored || (defaultTheme === 'system' ? getSystemTheme() : defaultTheme)
  })

  // Fix: Proper setTheme function (no shadowing)
  const setTheme = (newTheme: Theme) => {
    console.log('Setting theme to:', newTheme) // Debug log
    setThemeState(newTheme)
    localStorage.setItem(storageKey, newTheme)

    // Force re-render check
    setTimeout(() => {
      console.log('Current classes:', document.documentElement.className)
      console.log('Current theme state:', newTheme)
    }, 100)
  }

  useEffect(() => {
    const root = document.documentElement

    // Add transition class for smooth animation
    root.style.transition = 'color 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1)'

    root.classList.remove("light", "dark")

    const actualTheme = theme === "system" ? getSystemTheme() : theme
    root.classList.add(actualTheme)

    console.log('Applied theme:', actualTheme) // Debug log

    // Remove transition after animation
    setTimeout(() => {
      root.style.transition = ''
    }, 300)
  }, [theme])

  // Add system theme change listener
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = () => {
      if (theme === 'system') {
        console.log('System theme changed, updating...') // Debug log
        const root = document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(mediaQuery.matches ? 'dark' : 'light')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  const value = {
    theme,
    setTheme,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}