import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isPublicRoute = createRouteMatcher(["/authentication/(signup|signin)"])

// NOTE : By default, clerkMiddleware will not protect any routes.
//        All routes are public and you must opt-in to protection for routes.
export default clerkMiddleware(async (clerkAuthenticationMiddleware, request) => {
  if (!isPublicRoute(request)) await clerkAuthenticationMiddleware.protect()
})

export const config = {
  matcher: [
    // Skip NextJS internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",

    // Always run for API routes.
    "/(api|trpc)(.*)"
  ]
}
