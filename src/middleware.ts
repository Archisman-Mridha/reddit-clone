/*
  Middleware allows you to run code before a request is completed. Then, based on the incoming
  request, you can modify the response by rewriting, redirecting, modifying the request or response
  headers, or responding directly.

  Middleware runs before cached content and routes are matched.
*/

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const isPublicRoute = createRouteMatcher([
  "/authentication/(signup|signin)",
  "/api/webhooks/(.*)"
])

// NOTE : By default, clerkMiddleware will not protect any routes.
//        All routes are public and you must opt-in to protection for routes.
export default clerkMiddleware(async (clerkAuthenticationMiddleware, request) => {
  // Make sure the user is authenticated, when accessing a private route.
  if (!isPublicRoute(request)) await clerkAuthenticationMiddleware.protect()

  const response = NextResponse.next()
  return response
})

export const config = {
  matcher: [
    // Skip NextJS internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",

    // Always run for API routes.
    "/(api|trpc)(.*)"
  ]
}
