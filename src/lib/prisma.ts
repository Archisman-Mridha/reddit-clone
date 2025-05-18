// This file creates a Prisma Client and attaches it to the global object so that only one instance
// of the client is created in your application.

import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"

declare global {
  var prisma: PrismaClient | undefined
}

if (typeof global !== "undefined" && !global.prisma) {
  global.prisma = new PrismaClient().$extends(
    // Provides globally-optimized caching and connection pooling.
    withAccelerate()
  )
}
