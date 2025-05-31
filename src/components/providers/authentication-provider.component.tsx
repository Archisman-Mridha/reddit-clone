"use client"

import { ClerkProvider } from "@clerk/nextjs"
import { useTheme } from "next-themes"
import type { FunctionComponent, PropsWithChildren } from "react"
import { Themes } from "./theme-provider.component"
import { dark, experimental__simple } from "@clerk/themes"

export const AuthenticationProvider: FunctionComponent<PropsWithChildren> = ({
  children
}) => {
  const { resolvedTheme } = useTheme()

  const clerkComponentsBaseTheme =
    (resolvedTheme as Themes) === Themes.dark ? dark : experimental__simple

  return (
    <ClerkProvider appearance={{ baseTheme: clerkComponentsBaseTheme }}>
      {children}
    </ClerkProvider>
  )
}
