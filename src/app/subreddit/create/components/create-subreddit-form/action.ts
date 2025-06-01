"use server"

import "server-only"
import {
  type BaseActionState,
  createActionWithValidatedFormData
} from "@/lib/utils/actions"
import { createSubRedditFormSchema } from "./schema"
import prismaClient from "@/lib/prisma/prisma"
import { auth } from "@clerk/nextjs/server"

interface CreateSubRedditActionState extends BaseActionState {
  subRedditID?: number
}

export const createSubRedditAction = createActionWithValidatedFormData(
  createSubRedditFormSchema,
  async function (formData): Promise<CreateSubRedditActionState> {
    // Get the user-id.
    const { userId: userID } = await auth()
    if (!userID) return { error: "user isn't authenticated" }

    // Create the sub-reddit.
    const { id: subRedditID } = await prismaClient.subReddit.create({
      data: {
        ...formData,
        members: {
          connect: [{ id: userID }]
        }
      }
    })

    return { subRedditID }
  }
)
