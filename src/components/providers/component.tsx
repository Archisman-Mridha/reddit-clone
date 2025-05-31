"use client"

import type { FunctionComponent, PropsWithChildren } from "react"
import { ThemeProvider } from "./theme-provider.component"
import { AuthenticationProvider } from "./authentication-provider.component"

export const Providers: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthenticationProvider>{children}</AuthenticationProvider>
    </ThemeProvider>
  )
}
