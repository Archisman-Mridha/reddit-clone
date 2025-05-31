// This file creates a Prisma Client and attaches it to the global object so that only one instance
// of the client is created in your application.

import { withAccelerate } from "@prisma/extension-accelerate"
import { PrismaClient } from "./generated"

const globalForPrismaClient = global as unknown as {
  prismaClient: PrismaClient
}

const prismaClient =
  globalForPrismaClient.prismaClient || new PrismaClient().$extends(withAccelerate())

if (process.env.NODE_ENV !== "production")
  globalForPrismaClient.prismaClient = prismaClient

export default prismaClient
