"use client"

import type { FunctionComponent, PropsWithChildren } from "react"
import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes"
import { Button } from "../shadcn/button"
import { Moon, Sun } from "lucide-react"

export enum Themes {
  dark = "dark",
  light = "light"
}

export const ThemeProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme={Themes.dark}
    >
      <ThemeSwitcher />

      {children}
    </NextThemeProvider>
  )
}

const ThemeSwitcher: FunctionComponent = () => {
  const { resolvedTheme, setTheme } = useTheme()

  const switchTheme = () =>
    setTheme(resolvedTheme === Themes.dark ? Themes.light : Themes.dark)

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={switchTheme}
    >
      {resolvedTheme === Themes.dark ? <Sun /> : <Moon />}
    </Button>
  )
}
